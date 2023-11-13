import React, { useEffect, useState } from "react";
import { BsDiscord } from "react-icons/bs";

import { useUser } from "@/components/context/UserProvider";

const LoginDiscord = (props) => {
	//

	const { onSignInDiscord } = useUser();

	const onClickButton = async (params) => {
		//
		onSignInDiscord();
	};

	return (
		<>
			<button className="btn btn-accent btn-wide " onClick={onClickButton}>
				<BsDiscord size={30} />
				Sign in with Discord
			</button>
		</>
	);
};

export default LoginDiscord;
