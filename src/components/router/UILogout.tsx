import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useEffect } from "react";
import React from "react";

import { useUser } from "@/components/context/UserProvider";

interface UILogoutProps {}

const UILogout: FC<UILogoutProps> = () => {
	const { onSignOut } = useUser();

	const router = useRouter();

	useEffect(() => {
		// onSignOut
		onSignOut();
		router.push("/");

		return () => {
			// cleanup
		};
	}, []);

	return <></>;
};

export default UILogout;
