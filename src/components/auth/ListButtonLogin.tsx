import React, { useEffect, useState } from "react";

import LoginDiscord from "@/components/auth/LoginDiscord";
import LoginFacebook from "@/components/auth/LoginFacebook";
import LoginGithub from "@/components/auth/LoginGithub";
import LoginGoogle from "@/components/auth/LoginGoogle";

const ListButtonLogin = (props) => {
	//

	return (
		<>
			<LoginGoogle />
			<LoginDiscord />
			<LoginGithub />
			<LoginFacebook />
		</>
	);
};

export default ListButtonLogin;
