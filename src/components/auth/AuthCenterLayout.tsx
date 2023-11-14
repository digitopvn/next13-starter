import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React, { createContext, useContext } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

import ListButtonLogin from "@/components/auth/ListButtonLogin";
import LoginGuest from "@/components/auth/LoginGuest";
import UserAvatar from "@/components/auth/UserAvatar";
import DialogLogin from "@/components/auth/users/DialogLogin";
import { useStorage } from "@/components/context/StorageProvider";
import { useUser } from "@/components/context/UserProvider";
import { showDialog } from "@/plugins/dialogs";

interface IContext {
	checkLoginFirst: (nextAction?: string) => boolean;
}

export const AuthCenterContext = createContext<IContext | undefined>(undefined);

interface IAuthCenterLayout {
	children?: ReactNode;
	button?: ReactNode;
}

const AuthCenterLayout = ({
	button = (
		<>
			<ListButtonLogin />
			<LoginGuest />
		</>
	),
	...props
}: IAuthCenterLayout) => {
	const router = useRouter();

	const { status } = useUser();
	const { user } = useStorage();

	//

	const checkLoginFirst = (nextAction?: string) => {
		//
		if (nextAction) {
			router.push(
				{
					query: {
						...router.query,
						nextAction,
					},
				},
				undefined,
				{ shallow: true }
			);
		}
		if (!user) {
			//
			showDialog("components-auth-users-dialog-login");
			return false;
		}

		return true;
	};

	return (
		<AuthCenterContext.Provider
			value={{
				checkLoginFirst,
			}}
		>
			<div className="flex h-full flex-col items-center justify-center gap-2 p-4 dark:text-white">
				{status == "unauthenticated" ? button : <UserAvatar data={user} />}

				{router.asPath.split("/").filter((x) => x).length > 1 ? (
					<button
						className="fixed left-0 top-0 z-20 m-4"
						onClick={() => {
							router.push(`/${router.asPath.split("/").filter((x) => x)?.[0]}`);
						}}
					>
						<IoArrowBackOutline size={40} />
					</button>
				) : (
					<></>
				)}

				<div className="divider"></div>

				<DialogLogin />

				{props?.children}
			</div>
		</AuthCenterContext.Provider>
	);
};

AuthCenterLayout.propTypes = {};

export default AuthCenterLayout;

export const useAuthCenterLayout = () => {
	const context = useContext(AuthCenterContext);
	if (!context) {
		throw new Error("useAuthCenterLayoutProvider has to be used within <AuthCenterContext.Provider>");
	}
	return context;
};
