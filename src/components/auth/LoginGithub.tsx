import React, { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";

import { useUser } from "@/components/context/UserProvider";

const LoginGithub = (props) => {
	//

	const { onSignInGithub } = useUser();

	const onClickButton = async (params) => {
		//
		onSignInGithub();
	};

	return (
		<>
			<button className="btn btn-accent btn-wide " onClick={onClickButton}>
				<AiFillGithub size={30} />
				Sign in with Github
			</button>
		</>
	);
};

export default LoginGithub;
