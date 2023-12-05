import React, { useEffect, useState } from "react";
import { TbLogout2 } from "react-icons/tb";

import { useUser } from "@/components/context/UserProvider";

const LoginLogout = (props) => {
	//
	const { onSignOut } = useUser();

	const onLogout = async (params) => {
		//
		onSignOut();
	};

	return (
		<>
			<button className="btn btn-primary btn-wide m-1 " onClick={onLogout}>
				<TbLogout2 size={30} />
				Logout
			</button>
		</>
	);
};

export default LoginLogout;
