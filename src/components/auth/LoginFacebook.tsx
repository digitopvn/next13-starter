import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";

import { useUser } from "@/components/context/UserProvider";

const LoginFacebook = (props) => {
	//

	const { onSignInFacebook } = useUser();

	const onClickButton = async (params) => {
		//
		onSignInFacebook();
	};

	return (
		<>
			<button className="btn btn-accent btn-wide " onClick={onClickButton}>
				<FaFacebook size={30} />
				Sign in with Facebook
			</button>
		</>
	);
};

export default LoginFacebook;
