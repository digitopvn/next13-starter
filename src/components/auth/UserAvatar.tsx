import type { User } from "@prisma/client";
import type { ReactNode } from "react";
import React, { useEffect, useMemo, useState } from "react";

import Img from "@/components/common/Img";
import { useStorage } from "@/components/context/StorageProvider";
import { useUser } from "@/components/context/UserProvider";
import { showDialog } from "@/plugins/dialogs";

interface IUserAvatar {
	children?: ReactNode;
	data?: User;
}

const UserAvatar = ({ data, ...props }: IUserAvatar) => {
	const { user } = useStorage();
	const { onSignOut } = useUser();

	const main = useMemo(() => {
		if (data?.id == user?.id)
			return (
				<>
					<li>
						<button
							className="btn-ghost"
							onClick={() => {
								showDialog("components-auth-users-dialog-update-user");
							}}
						>
							Cập nhật
						</button>
					</li>
					<li>
						<button className="btn-ghost" onClick={onSignOut}>
							Logout
						</button>
					</li>
				</>
			);

		return <></>;
	}, []);

	return (
		<>
			<div className="dropdown ">
				<label tabIndex={0} className="pointer-events-all list-none">
					<div className="chat chat-start">
						<div className="avatar chat-image">
							<div className=" w-12 ">
								<Img
									alt="avatar"
									className="mask mask-squircle w-12"
									crossOrigin="anonymous"
									referrerPolicy="no-referrer"
									src={data?.image || ""}
								/>
							</div>
						</div>
						<div className="pt-1 text-3xl">{data?.name}</div>
					</div>
				</label>

				<ul tabIndex={0} className="menu dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow">
					{main}
				</ul>
			</div>

			{props.children}
		</>
	);
};

export default UserAvatar;
