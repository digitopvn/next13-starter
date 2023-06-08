import { isNull, toArray } from "diginext-utils/dist/object";
import Timer from "diginext-utils/dist/Timer";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import type { SignInOptions } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

import { useStorage } from "@/components/context/StorageProvider";
import { AppConfig } from "@/modules/config/AppConfig";
import ApiCall from "@/plugins/api-call/ApiCall";
import { showNotifications } from "@/plugins/notifications";

export interface IUser {
	id?: string;
	name?: string;
	email?: string;
	status?: "loading" | "login" | "not-login";
}
type UserContextType = {
	onSignOut: () => void;
	getProfile: () => void;
	onSignInById: (id: string, options?: SignInOptions) => void;
	onSignInGoogle: () => void;
	onSigninFacebook: (options?: SignInOptions) => void;
};

export const UserContext = React.createContext<UserContextType | null>(null);

interface Props {
	isPrivate?: boolean;
	children?: React.ReactNode;
}

const UserProvider: React.FC<Props> = ({ children, isPrivate }) => {
	const router = useRouter();
	const { query } = router;
	const { urlCallback } = query;

	const { user, setUser, token, setToken } = useStorage();

	const { data: session, status } = useSession();

	const [isShowChildren, setIsShowChildren] = useState(!isPrivate || (isPrivate && user?.name && token));

	const onSignOut = async () => {
		console.log("onSignOut");
		setToken(null);
		setUser({
			status: "not-login",
		});

		await signOut({ redirect: false });
	};

	const onSignInById = async (id: string, options?: SignInOptions) => {
		//
		await signIn(id, {
			callbackUrl: AppConfig.getBaseUrl(),
			...options,
		});
	};

	const onSigninFacebook = async (options?: SignInOptions) => {
		await onSignInById("login-fb", options);
	};

	const onSignInGoogle = (options?: SignInOptions) => {
		onSignInById("google", options);
	};

	const getProfile = async () => {
		const res = await ApiCall({
			path: "/api/v1/auth/customers/profiles",
			token: (session as any).token.id,
		});

		console.log("getProfile res :>> ", res);

		if (res.status) {
			setUser({ ...user, ...res.data, status: "login" });
			return res.data;
		}
		onSignOut();
		return false;
	};

	const onChangeSession = async () => {
		console.log("session :>> ", session);
		if (status === "loading") return false; // skip loading

		if (status === "unauthenticated") {
			// not login
			onSignOut();
			if (isPrivate) {
				router.push("/");
			}
			return false;
		}
		const { token: tokenFromSession } = session as any;

		// if ((session as any)?.needRefresh) {
		// 	// token expired

		// 	// onRefreshToken({
		// 	//     token: token?.id,
		// 	//     refreshToken: token?.refreshToken,
		// 	// });
		// 	return false;
		// }

		if ((session as any)?.error) {
			// handle error

			const msgs = toArray((session as any)?.response?.message) as Array<string>;
			if (msgs) showNotifications(msgs, true);

			onSignOut();
			return false;
		}

		if (tokenFromSession) {
			// handle token
			setToken(tokenFromSession.id);
			// if (checkTokenExpired(token)) return;
		}

		if (isEmpty(user) || router?.isReady) {
			// handle login

			// handle profile
			const userApi = await getProfile();
			if (!userApi) {
				console.log("userApi", userApi);
				console.log("PLEASE CONFIG API GET PROFILE!");
				return false;
			}

			// handle next route
			if (urlCallback) {
				delete query.urlCallback;
				router.push(
					{
						pathname: decodeURIComponent(urlCallback as string),
						query: { ...query },
					},
					undefined,
					{ shallow: true }
				);
			}

			// handle show children
			setIsShowChildren(!isPrivate || (isPrivate && userApi && tokenFromSession.id));
			return true;
		}

		onSignOut();

		if (isPrivate) {
			router.push("/");
		}

		return false;
	};

	const checkUser = async () => {
		//

		if (!user) return;

		switch (user?.status) {
			case "loading":
				{
				}
				break;

			case "not-login":
				{
				}
				break;

			case "login":
				{
				}
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		checkUser();
		return () => {};
	}, [user?.status]);

	useEffect(() => {
		(async () => {
			await Timer.wait(100);
			onChangeSession();
		})();
		return () => {};
	}, [status, JSON.stringify(session), router?.isReady]);

	return (
		<UserContext.Provider
			value={{
				//
				getProfile,
				onSignOut,
				onSignInById,
				onSigninFacebook,
				onSignInGoogle,
			}}
		>
			{isShowChildren ? <>{children}</> : <></>}
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
