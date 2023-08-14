import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import type { FC } from "react";
import React from "react";

import { useStorage } from "@/components/context/StorageProvider";
import { useUser } from "@/components/context/UserProvider";
import { AppConfig } from "@/modules/config/AppConfig";

interface UILoginProps {}

const UILogin: FC<UILoginProps> = () => {
	const { user } = useStorage();

	const { onSigninFacebook } = useUser();
	const pathname = usePathname();

	const onLoginGoogle = () => {
		signIn("google", { callbackUrl: AppConfig.getBaseUrl(pathname) });
	};

	const onLoginFacebook = async () => {
		// signIn("login-fb");
		const res = await onSigninFacebook({ callbackUrl: AppConfig.getBaseUrl(pathname) });

		console.log("res :>> ", res);
	};

	const handleLogout = () => {
		signOut({ redirect: false });
	};

	return (
		<>
			<p>UILogin</p>
			{user?.status === "not-login" ? (
				<>
					<div className="auth">
						<button onClick={handleLogout} className="btn">
							Logout
						</button>
					</div>
				</>
			) : (
				<>
					<button onClick={onLoginGoogle} className="btn">
						Login Google
					</button>
					<button onClick={onLoginFacebook} className="btn">
						Login Facebook
					</button>
				</>
			)}
		</>
	);
};

export default UILogin;
