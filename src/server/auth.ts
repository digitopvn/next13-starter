import { PrismaAdapter } from "@next-auth/prisma-adapter";
import axios from "axios";
import { randomElement } from "diginext-utils/dist/array";
import { randomStringAndNumberByLength } from "diginext-utils/dist/string/random";
import { type GetServerSidePropsContext } from "next";
import { type DefaultSession, getServerSession, type NextAuthOptions } from "next-auth";
import type { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";
import type { Provider } from "next-auth/providers";
import BattleNetProvider from "next-auth/providers/battlenet";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env.mjs";
import { AppConfig } from "@/modules/config/AppConfig";
import ApiCall from "@/plugins/api-call/ApiCall";
import generateHmacAuth from "@/plugins/crypto/generateHmacAuth";
import randomUrlImage from "@/plugins/utils/randomUrlImage";
import { prisma } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: DefaultSession["user"] & {
			id: string;
			// ...other properties
			// role: UserRole;
		};
	}

	// interface User extends UserDefault {
	// 	// ...other properties
	// 	// role: UserRole;
	// 	emailOriginal?: string;
	// 	providerAccountId: string;
	// }
}

const checkImageAlive = async (url: string) => {
	//

	try {
		// Make a HEAD request to the URL
		const response = await axios.head(url);
		// If the status code is 200, the image is alive
		if (response.status <= 400) return url;
	} catch (error) {
		// console.log("error :>> ", error);
		// If there was an error (e.g., 404 or 500 status code), the image is not alive
		// console.error("Error checking image:", error.message);
	}

	return randomUrlImage();
};

const providers = [] as Provider[];
if (env.NEXT_PUBLIC_DISCORD_CLIENT_ID) {
	providers.push(
		DiscordProvider({
			clientId: env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string,
			clientSecret: env.DISCORD_CLIENT_SECRET as string,
			profile(profile) {
				return {
					providerAccountId: `DISCORD-${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}-${profile.id}`,
					id: profile.id,
					name: profile.username,
					email: null,
					emailOriginal: profile.email,
					image: profile.image_url,
				};
			},
		})
	);
}

if (env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
	providers.push(
		GoogleProvider({
			clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			profile(profile) {
				return {
					providerAccountId: `GOOGLE-${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}-${profile.sub}`,
					id: profile.sub,
					name: profile.name,
					email: null,
					emailOriginal: profile.email,
					image: profile.picture,
				};
			},
		})
	);
}

if (env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID) {
	providers.push(
		FacebookProvider({
			clientId: env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
			clientSecret: env.FACEBOOK_CLIENT_SECRET as string,
			profile(profile: any) {
				return {
					providerAccountId: `FACEBOOK-${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}-${profile.id}`,
					id: profile.id,
					name: profile.name,
					email: null,
					emailOriginal: profile.email,
					image: profile?.picture?.data?.url,
				};
			},
		})
	);
}
if (env.NEXT_PUBLIC_GITHUB_ID) {
	providers.push(
		GitHubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
			profile(profile) {
				return {
					providerAccountId: `GITHUB-${process.env.NEXT_PUBLIC_GITHUB_ID}-${profile.id}`,
					id: profile.id.toString(),
					name: profile.name ?? profile.login,
					email: null,
					emailOriginal: profile.email,
					image: profile.avatar_url,
				};
			},
		})
	);
}
if (env.NEXT_PUBLIC_BATTLENET_CLIENT_ID) {
	providers.push(
		BattleNetProvider({
			clientId: process.env.NEXT_PUBLIC_BATTLENET_CLIENT_ID as string,
			clientSecret: process.env.BATTLENET_CLIENT_SECRET as string,
			issuer: process.env.BATTLENET_ISSUER as
				| "https://www.battlenet.com.cn/oauth"
				| "https://us.battle.net/oauth"
				| "https://eu.battle.net/oauth"
				| "https://kr.battle.net/oauth"
				| "https://tw.battle.net/oauth",
			profile(profile: any) {
				return {
					providerAccountId: `BATTLENET-${process.env.NEXT_PUBLIC_BATTLENET_CLIENT_ID}-${profile.sub}`,
					id: profile.sub,
					name: profile.battle_tag,
					email: null,
					image: null,
				};
			},
		})
	);
}

providers.push(
	CredentialsProvider({
		id: "domain-login",
		name: "Domain Account",
		async authorize(input, req) {
			if (!input || !input.email || !input.password) {
				throw new Error("Missing credentials!");
			}
			const user = await prisma.user.findFirst({
				where: {
					email: input.email,
				},
			});

			if (!user) {
				throw new Error("Invalid email!");
			}

			console.log("user :>> ", user);

			const passCrypt = generateHmacAuth(input.password);

			// Check if the hashed password matches the provided password
			const isPasswordValid = passCrypt == user.password;
			if (!isPasswordValid) {
				throw new Error("Invalid password!");
			}
			//
			return user;
		},
		credentials: {
			email: { label: "Email", type: "text" },
			password: { label: "Password", type: "password" },
		},
	})
);

providers.push(
	CredentialsProvider({
		id: "guest-login",
		name: "Guest Login",
		async authorize(credentials, req) {
			//
			const codeName = randomElement(["Bí danh", "Giấu tên", "Ẩn mật", "Lẩn trốn", "Tàng hình", "Siêu nhân"]);
			const id = randomStringAndNumberByLength(3);
			const providerAccountId = randomStringAndNumberByLength(32);

			const existingRole = await prisma.role.findFirst({ where: { name: "Viewer" } });
			if (existingRole?.id) throw new Error("Not found role");

			const user = await prisma.user.create({
				data: {
					name: `${codeName} ${id}`,
					providerAccountId,
					image: randomUrlImage(),
				},
			});

			if (!user) throw new Error("Lỗi rồi má ơi");

			return user;
		},
		credentials: {
			// username: { label: "Username", type: "text ", placeholder: "jsmith" },
			// password: { label: "Password", type: "password" },
		},
	})
);

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	callbacks: {
		async jwt({ token, user, account }) {
			// console.log("JWT token, user, account  :>> ", token, user, account);
			// console.log("JWT token :>> ", token);
			// console.log("JWT user :>> ", user);
			// console.log("JWT account :>> ", account);
			// token.tokenId = token.token;
			// if (user) {
			// 	if (typeof user === "string") {
			// 		// console.log('Empty block statement.');
			// 	} else {
			// 		const { token: tokenData } = user as any;
			// 		if (tokenData) token.tokenId = tokenData;
			// 		token = {
			// 			...token,
			// 			...user,
			// 		};
			// 	}
			// }
			// if (account?.provider === "google") {
			// 	token.access_token = account.access_token;
			// }
			return token;
		},

		async session({ session, user, token }) {
			// console.log("session :>> ", session, user, token);

			// console.log("SESSION session :>> ", session);
			// console.log("SESSION user :>> ", user);
			// console.log("SESSION token :>> ", token);

			const { name, email } = session.user;

			// await Timer.wait(1000);

			return {
				...session,
				user: {
					name,
					id: token?.sub,
				},
			};
		},
	},

	events: {
		async signIn(message) {
			/* on successful sign in */
		},
		async signOut(message) {
			/* on signout */
		},
		async createUser(message) {
			/* user created */
			// const user = message.user as any;
			// (async () => {
			// 	//create token api
			// 	const result = await ApiCall({
			// 		method: "POST",
			// 		url: AppConfig.getApiUploadStorage("/v3/auth/create-token"),
			// 		data: {
			// 			user: {
			// 				id: user.id,
			// 				name: user.name,
			// 				email: user.email || user.emailOriginal,
			// 				providerAccountId: user.providerAccountId,
			// 			},
			// 		},
			// 		contentType: "json",
			// 	});
			// 	if (result.status) {
			// 		const { data } = result;
			// 		if (data.token?.key) {
			// 			const updatedUser = await prisma.user.update({
			// 				where: { id: user.id },
			// 				data: {
			// 					token: {
			// 						create: {
			// 							key: data.token?.key,
			// 						},
			// 					},
			// 				},
			// 				select: { token: true },
			// 			});
			// 		}
			// 		// if (!data) return;
			// 	}
			// })();
		},
		async updateUser(message) {
			/* user updated - e.g. their email was verified */
		},
		async linkAccount(message) {
			const { user } = message;

			const image = await checkImageAlive(user.image || "");
			if (image !== user.image) {
				await prisma.user.update({
					where: { id: user.id },
					data: {
						image,
					},
					select: {
						id: true,
						name: true,
						email: true,
						image: true,
						emailVerified: true,
					},
				});
			}

			/* account (e.g. Twitter) linked to a user */
		},
		async session(message) {
			/* session is active */
		},
	},

	adapter: PrismaAdapter(prisma),
	// adapter: CustomPrismaAdapter(),

	providers,

	session: {
		strategy: "jwt",
	},
	jwt: {
		secret: env.JWT_SECRET,
		// The maximum age of the NextAuth.js issued JWT in seconds.
		// Defaults to `session.maxAge`.
		maxAge: 60 * 60 * 24 * 30,
		// You can define your own encode/decode functions for signing and encryption
		// async encode() {},
		// async decode() {},
	},

	pages: {
		signIn: AppConfig.getBasePath("/"),
		signOut: AppConfig.getBasePath("/logout"),
		error: AppConfig.getBasePath("/logout"),
		verifyRequest: AppConfig.getBasePath("/"),
		newUser: AppConfig.getBasePath("/"),
	},
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
