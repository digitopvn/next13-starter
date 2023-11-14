import React, { useEffect, useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";

import { useUser } from "@/components/context/UserProvider";

const LoginFacebookBusiness = (props) => {
	//

	const { onSignInById } = useUser();

	const onClickButton = async (params) => {
		//
		onSignInById("facebook-business", {
			// redirect: false,
		});
		// onSignInFacebook();
	};

	return (
		<>
			<button className="btn btn-accent" onClick={onClickButton}>
				<FaFacebookSquare size={30} />
				Sign in with Facebook Business
			</button>
		</>
	);
};

export default LoginFacebookBusiness;
