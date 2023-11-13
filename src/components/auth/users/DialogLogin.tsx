import type { ChangeEvent, ReactNode } from "react";
import React, { useEffect, useState } from "react";

import ListButtonLogin from "@/components/auth/ListButtonLogin";
import LoginGuest from "@/components/auth/LoginGuest";
import { useApiProvider } from "@/components/context/ApiProvider";
import { useStorage } from "@/components/context/StorageProvider";
import { useUser } from "@/components/context/UserProvider";
import { AppConfig } from "@/modules/config/AppConfig";
import { hideDialog, showDialog } from "@/plugins/dialogs";
import { tryMutation } from "@/plugins/hooks/tryMutation";
// import { useEventEmitter } from 'ahooks';

interface IDialogLogin {
	children?: ReactNode;
}

const DialogLogin = (props: IDialogLogin) => {
	const { user } = useStorage();

	const [url, setUrl] = useState(user?.image || "");

	return (
		<>
			<dialog id="components-auth-users-dialog-login" className="modal">
				<div className="flex flex-col items-center justify-center gap-3 bg-base-200 p-4 dark:text-white">
					<br />

					<h4>Đăng nhập</h4>

					<div className="divider"></div>

					<ListButtonLogin />
					<div className="divider"></div>
					<LoginGuest />

					<div className="divider"></div>

					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-neutral bg-base-100 font-bold text-white">Close</button>
					</form>
					<br />
				</div>
			</dialog>

			{props.children}
		</>
	);
};

export default DialogLogin;
