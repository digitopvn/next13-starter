/* eslint-disable react-hooks/rules-of-hooks */
import type { User } from "@prisma/client";
import { toBool } from "diginext-utils/dist/object";
import Timer from "diginext-utils/dist/Timer";
import { useRouter } from "next/router";
import type { SignInOptions, SignInResponse } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { FC, useContext, useEffect, useState } from "react";

import { useStorage } from "@/components/context/StorageProvider";
import PageLogin from "@/components/router/examples/PageLogin";
import { AppConfig } from "@/modules/config/AppConfig";
import { api } from "@/plugins/trpc/api";

type UserContextType = {
	getProfile: () => Promise<User | null>;
	onSignOut: () => void;
	onSignInById: (id: string, options?: SignInOptions) => Promise<SignInResponse | undefined>;
	onSignInGoogle: (options?: SignInOptions) => Promise<SignInResponse | undefined>;
	onSignInFacebook: (options?: SignInOptions) => Promise<SignInResponse | undefined>;
	onSignInDiscord: (options?: SignInOptions) => Promise<SignInResponse | undefined>;
	onSignInGithub: (options?: SignInOptions) => Promise<SignInResponse | undefined>;
};

export const UserContext = React.createContext<UserContextType | null>(null);

export interface IUserProvider {
	isPrivate?: boolean;
	children?: React.ReactNode;
}

const UserProvider: React.FC<IUserProvider> = ({ children, isPrivate, ...props }) => {
	const router = useRouter();
	const { query } = router;
	const { urlCallback } = query;

	const { user, setUser, token, setToken, setIsLoading } = useStorage();

	const { data: session, status } = useSession();

	const {
		data: profile,
		isError,
		isSuccess,
		error,
		refetch,
	} = api.user.getProfile.useQuery(
		undefined, // no input
		{ enabled: session?.user !== undefined }
	);

	const [isShowChildren, setIsShowChildren] = useState(
		toBool(!isPrivate || toBool(isPrivate && status == "authenticated"))
	);
	useEffect(() => {
		setIsShowChildren(toBool(!isPrivate || toBool(isPrivate && status == "authenticated")));
	}, [isPrivate, status]);

	const onSignOut = async () => {
		console.log("onSignOut");
		setToken(null);
		setUser(undefined);

		await signOut({ redirect: false });

		setIsLoading(true);
		let i = 0;
		while (i < 10) {
			await Timer.wait(100);
			await signOut({ redirect: false });
			i++;
		}
		setIsLoading(false);
	};

	const onSignInById = async (id: string, options?: SignInOptions) => {
		return signIn(id, {
			callbackUrl: AppConfig.getBaseUrl(router.asPath),
			...options,
		});
	};
	const onSignInFacebook = async (options?: SignInOptions) => {
		return onSignInById("facebook", options);
	};
	const onSignInGoogle = async (options?: SignInOptions) => {
		return onSignInById("google", options);
	};
	const onSignInDiscord = async (options?: SignInOptions) => {
		return onSignInById("discord", options);
	};
	const onSignInGithub = async (options?: SignInOptions) => {
		return onSignInById("github", options);
	};

	const getProfile = async () => {
		//
		const res = await refetch();
		if (res.isSuccess) {
			return res.data;
		}

		return null;
	};

	useEffect(() => {
		switch (true) {
			case status == "loading":
				setIsLoading(true);
				break;

			case status == "unauthenticated":
			case isSuccess:
			default:
				setIsLoading(false);
				break;
		}
	}, [status, isSuccess]);

	useEffect(() => {
		if (profile) {
			setUser(profile as User);
			setIsLoading(false);
		}

		return () => {};
	}, [JSON.stringify(profile)]);

	if (status == "loading") return <></>;

	// Error state
	if (isError) {
		return <div>An error occurred: {error.message}</div>;
	}

	return (
		<UserContext.Provider
			value={{
				//
				getProfile,
				onSignOut,
				onSignInById,
				onSignInFacebook,
				onSignInGoogle,
				onSignInDiscord,
				onSignInGithub,
			}}
		>
			{isShowChildren ? <>{children}</> : <PageLogin />}
		</UserContext.Provider>
	);
};

export default UserProvider;

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser has to be used within <UserContext.Provider>");
	}
	return context;
};
