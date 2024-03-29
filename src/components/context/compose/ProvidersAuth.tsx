/* eslint-disable import/extensions */
import React from "react";

// import AuthCenterLayout from "@/components/auth/AuthCenterLayout";
import Compose from "@/components/context/compose/Compose";
import RoleProvider from "@/components/context/RoleProvider";
import UserProvider from "@/components/context/UserProvider";
// import DebugAuthProvider from "@/components/debug/DebugAuth";
const ProvidersAuth = (props: any) => {
	return (
		<Compose
			components={[
				//
				UserProvider,
				RoleProvider,
				// AuthCenterLayout,
				// DebugAuthProvider,
			]}
			basePath={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`}
			clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
			{...props}
		></Compose>
	);
};

export default ProvidersAuth;
