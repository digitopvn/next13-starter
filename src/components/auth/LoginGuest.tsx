import Timer from "diginext-utils/dist/Timer";
import React, { useEffect, useState } from "react";
import { GiNinjaHead } from "react-icons/gi";

import { useListener } from "@/components/context/ListenerProvider";
import { useUser } from "@/components/context/UserProvider";

const LoginGuest = (props) => {
	//

	const listener = useListener();

	const onListen = (e: any) => {
		const { type } = e;
		switch (type) {
			case "":
				break;

			default:
				break;
		}
	};

	if (listener) {
		listener.useSubscription((e: any) => {
			onListen(e);
		});
	}

	const { onSignInById } = useUser();

	const onClickButton = async () => {
		//
		await onSignInById("guest-login", {
			redirect: false,
		});

		await Timer.wait(500);
		listener.emit({
			type: "checkNextAction",
		});
	};

	return (
		<>
			<button className="btn btn-primary btn-wide " onClick={onClickButton}>
				<GiNinjaHead size={30} />
				Ẩn mật giáo
			</button>
		</>
	);
};

export default LoginGuest;
