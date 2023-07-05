import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import { AppConfig } from "@/modules/config/AppConfig";
import ApiCall from "@/plugins/api-call/ApiCall";
import handleError from "@/plugins/next-auth/handleError";

// TODO logout
export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			id: "refresh-token",
			name: "Refresh Token",

			credentials: {
				token: { label: "", type: "text", placeholder: "" },
				refreshToken: { label: "", type: "text", placeholder: "" },
			},

			async authorize(credentials: any) {
				const { token, refreshToken } = credentials;

				const res = await ApiCall({
					path: "/api/v1/auth/customers/refresh",
					method: "PUT",
					token,
					data: {
						refreshToken,
					},
					contentType: "application/json",
				});

				if (res.data) {
					return {
						step: "refresh-token",
						...res.data,
					};
				}

				return handleError({
					...res,
				});
			},
		}),

		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			id: "login-form",
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: "username", type: "text", placeholder: "username" },
				password: { label: "password", type: "text", placeholder: "password" },
			},
			async authorize(credentials: any) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				// console.log("credentials", credentials);

				const { username, password } = credentials;

				const res = await ApiCall({
					path: "/api/v1/auth/customers/login",
					method: "POST",
					data: { username, password },
					contentType: "json",
				});

				res.data = res.data || {};
				const { token, refreshToken } = res.data;
				// If no error and we have user data, return it
				if (res.status) {
					// // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					return {
						step: "login-form",
						token,
						refreshToken,
					};
				}
				// Return null if user data could not be retrieved
				return handleError({
					...res,
				});
			},
		}),

		// Login Google
		GoogleProvider({
			id: "google",
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
			profile(profile) {
				return {
					...profile,
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
					step: "login-google",
				};
			},
		}),

		FacebookProvider({
			id: "login-fb",
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
			authorization: "https://www.facebook.com/v17.0/dialog/oauth?scope=email",
			token: "https://graph.facebook.com/oauth/access_token",
			userinfo: {
				url: "https://graph.facebook.com/me",
				params: { fields: "id,name,email,picture" },
				async request({ tokens, client, provider }) {
					const clientSide = await client.userinfo(tokens.access_token as any, {
						// @ts-expect-error
						params: provider.userinfo?.params,
					});

					const res = await ApiCall({
						path: "/api/v1/auth/customers/login/facebook",
						method: "POST",
						data: {
							accessToken: tokens.access_token,
						},
						contentType: "json",
					});

					res.data = res.data || {};
					const { token, refreshToken } = res.data;
					// // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					if (token) {
						return {
							...clientSide,
							step: "login-fb",
							token,
							refreshToken,
							status: res.status,
							...res.data,
						};
					} else {
						console.log("error login/facebook:>> ", JSON.stringify(res));
					}
					return {
						...clientSide,
						step: "login-fail",
						token,
						refreshToken,
						error: true,
						response: res,
						...res,
					};
				},
			},
			profile(profile) {
				// console.log("profile :>> ", profile);
				return {
					...profile,
					id: profile.id,
					name: profile.name,
					email: profile.email,
					// image: profile.picture.data.url,
				};
			},
		}),
	],

	callbacks: {
		async signIn() {
			return true;
		},

		async jwt({ token, user, account }) {
			token.tokenId = token.token;
			if (user) {
				if (typeof user === "string") {
					// console.log('Empty block statement.');
				} else {
					const { token: tokenData } = user as any;
					if (tokenData) token.tokenId = tokenData;
					token = {
						...token,
						...user,
					};
				}
			}
			if (account?.provider === "google") {
				token.access_token = account.access_token;
			}
			return token;
		},

		async session({ session, token }) {
			const { step, error, response } = token as any;

			if (error) {
				(session as any).error = true;
				(session as any).response = response;
				return session;
			}

			(session as any).token = {
				id: token.tokenId,
				refreshToken: token.refreshToken,
				iat: token.iat,
			};

			switch (step) {
				case "update-info": {
					(session as any).step = "update-success";
					// (session as any).user = { ...token };
					break;
				}

				case "login-google": {
					const res = await ApiCall({
						path: "/api/v1/auth/customers/login/google",
						method: "POST",
						data: {
							accessToken: token.access_token,
						},
						contentType: "json",
					});

					if (res.status) {
						(session as any).step = "login-success";
						(session as any).token = {
							id: res?.data?.token,
							refreshToken: res?.data?.refreshToken,
							iat: token.iat,
						};
					} else {
						//
						(session as any).error = true;
						(session as any).response = res;
						return session;
					}

					break;
				}

				case "refresh-token": {
					(session as any).needRefresh = false;
					break;
				}

				case "get-profile":
				case "login-fb": {
					(session as any).step = "login-success";
					// (session as any).user = { ...token };
					break;
				}
				default:
			}

			delete (session as any).user;
			return session;
		},
	},

	jwt: {
		secret: process.env.NEXTAUTH_SECRET as string,
		maxAge: 3 * 24 * 60 * 60 * 200, // 3 days
	}, // next-auth@4.0.0-beta.2

	session: {
		// strategy: "jwt",
		maxAge: 3 * 24 * 60 * 60 * 200, // 3 days
		updateAge: 24 * 60 * 60 * 200, // 24 hours

		// strategy: "jwt", // next-auth^beta to next-auth^4.0.5
		//     // Seconds - How long until an idle session expires and is no longer valid.
		//     maxAge: 30 * 24 * 60 * 60, // 30 days

		//     // Seconds - Throttle how frequently to write to database to extend a session.
		//     // Use it to limit write operations. Set to 0 to always update the database.
		//     // Note: This option is ignored if using JSON Web Tokens
		//     updateAge: 24 * 60 * 60, // 24 hours
		// },
		// jwt: {
		//     // secret: process.env.JWT_SECRET,
		//     signingKey: {
		//         kty: "oct",
		//         kid: "ZeDx4y8OrZyiFzbRyUMAjBSVzh7Ro9S0IYXRsEnSi5I",
		//         alg: "HS512",
		//         k: "iR2Ri1fcCz_XAYvW8qY0VEhHHqv3rUwIls3Wv8kdOiM"
		//     },
		//     // secret: process.env.SECRET,
		// basePath: `/${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth`
	},
	// events: {},
	/**
	 * CUSTOM PAGES:
	 */
	pages: {
		signIn: `${AppConfig.getBasePath()}/`,
		signOut: `${AppConfig.getBasePath()}/logout`,
		error: `${AppConfig.getBasePath()}/logout`,
		verifyRequest: `${AppConfig.getBasePath()}/logout`,
		newUser: `${AppConfig.getBasePath()}/`,
	},
});
