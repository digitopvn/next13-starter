import { notification } from "antd";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import type { FC } from "react";
import React, { useEffect } from "react";

import { useStorage } from "@/components/context/StorageProvider";
import { useUser } from "@/components/context/UserProvider";
import { env } from "@/env.mjs";
import { api } from "@/plugins/trpc/api";

type PageLoginProps = {
	providers?: any;
};

const PageLogin: FC<PageLoginProps> = ({ providers, ...props }: any) => {
	const {
		NEXT_PUBLIC_DISCORD_CLIENT_ID,
		NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		NEXT_PUBLIC_BATTLENET_CLIENT_ID,
		NEXT_PUBLIC_APPLE_ID,
		NEXT_PUBLIC_GITHUB_ID,
		NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
	} = env;

	const list = [
		//
		{ name: "domain-login", id: "domain-login" },
		NEXT_PUBLIC_DISCORD_CLIENT_ID
			? { name: "NEXT_PUBLIC_DISCORD_CLIENT_ID", id: NEXT_PUBLIC_DISCORD_CLIENT_ID }
			: null,
		NEXT_PUBLIC_GOOGLE_CLIENT_ID
			? { name: "NEXT_PUBLIC_GOOGLE_CLIENT_ID", id: NEXT_PUBLIC_GOOGLE_CLIENT_ID }
			: null,
		NEXT_PUBLIC_BATTLENET_CLIENT_ID
			? { name: "NEXT_PUBLIC_BATTLENET_CLIENT_ID", id: NEXT_PUBLIC_BATTLENET_CLIENT_ID }
			: null,
		NEXT_PUBLIC_APPLE_ID ? { name: "NEXT_PUBLIC_APPLE_ID", id: NEXT_PUBLIC_APPLE_ID } : null,
		NEXT_PUBLIC_GITHUB_ID ? { name: "NEXT_PUBLIC_GITHUB_ID", id: NEXT_PUBLIC_GITHUB_ID } : null,
		NEXT_PUBLIC_FACEBOOK_CLIENT_ID
			? { name: "NEXT_PUBLIC_FACEBOOK_CLIENT_ID", id: NEXT_PUBLIC_FACEBOOK_CLIENT_ID }
			: null,
	].filter((x) => x);

	const router = useRouter();

	const { user } = useStorage();
	const { data: session, status } = useSession();

	const { data: profile } = api.user.getProfile.useQuery(
		undefined, // no input
		{ enabled: session?.user !== undefined }
	);

	const { onSignOut, onSignInFacebook, onSignInDiscord, onSignInGithub, onSignInGoogle, onSignInById } = useUser();

	const handleLogout = () => {
		onSignOut();
	};

	const domainLogin = async () => {
		//
		const result = await onSignInById("domain-login", {
			redirect: false,
			password: "1123123123123",
			username: "1123123123123",
		});

		if (result?.ok) {
			//
		} else {
			notification.error({ message: result?.error });
		}

		console.log("result :>> ", result);
	};

	return (
		<>
			<p>PageLogin</p>
			{user ? (
				<>
					<div className="auth">
						<button onClick={handleLogout} className="btn">
							Logout
						</button>
					</div>
				</>
			) : (
				<>
					{list.map((item: any, index) => {
						if (item)
							switch (item.name) {
								case "NEXT_PUBLIC_DISCORD_CLIENT_ID":
									return (
										<button
											key={index}
											onClick={() => {
												onSignInDiscord();
											}}
											className="btn"
										>
											Login Discord
										</button>
									);
								case "NEXT_PUBLIC_GOOGLE_CLIENT_ID":
									return (
										<button
											key={index}
											onClick={() => {
												onSignInGoogle();
											}}
											className="btn"
										>
											Login Google
										</button>
									);
								case "NEXT_PUBLIC_FACEBOOK_CLIENT_ID":
									return (
										<button
											key={index}
											onClick={() => {
												onSignInFacebook();
											}}
											className="btn"
										>
											Login Facebook
										</button>
									);

								case "NEXT_PUBLIC_GITHUB_ID":
									return (
										<button
											key={index}
											onClick={() => {
												onSignInGithub();
											}}
											className="btn"
										>
											Login Github
										</button>
									);

								case "domain-login":
									return (
										<button key={index} onClick={domainLogin} className="btn">
											Login Domain
										</button>
									);
								default:
									break;
							}

						return <></>;
					})}
				</>
			)}
		</>
	);
};

export default PageLogin;
