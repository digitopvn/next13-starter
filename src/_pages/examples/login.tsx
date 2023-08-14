import dynamic from "next/dynamic";
import type { FC } from "react";
import React from "react";

import MasterPageAuth from "@/components/layouts/MasterPageAuth";

const UILogin = dynamic(() => import("@/components/router/examples/UILogin"), { ssr: false });

interface LoginProps {}
// src/pages/examples/login
const login: FC<LoginProps> = () => {
	return (
		<MasterPageAuth
			isPrivate={false}
			meta={{
				title: "Đăng nhập",
				description: "diginext13",
			}}
		>
			<UILogin />
		</MasterPageAuth>
	);
};

export default login;
