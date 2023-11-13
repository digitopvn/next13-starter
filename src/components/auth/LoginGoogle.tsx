import React, { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";

import { useUser } from "@/components/context/UserProvider";

const LoginGoogle = (props) => {
	//

	const { onSignInGoogle } = useUser();

	const onClickButtonLoginGoogle = async (params) => {
		//
		onSignInGoogle();
	};

	return (
		<>
			<button className="btn btn-accent btn-wide" onClick={onClickButtonLoginGoogle}>
				<BsGoogle size={30} />
				Sign in with google
			</button>
		</>
	);
};

export default LoginGoogle;
