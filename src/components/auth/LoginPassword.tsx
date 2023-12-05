import Timer from "diginext-utils/dist/Timer";
import React, { useEffect, useState } from "react";
import { GiNinjaHead } from "react-icons/gi";
import { TbLogin2 } from "react-icons/tb";

import { useListener } from "@/components/context/ListenerProvider";
import { useUser } from "@/components/context/UserProvider";

const LoginPassword = (props) => {
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

	const onSubmit = async (e) => {
		e.preventDefault();

		// Create a FormData object from the form
		const formData = new FormData(e.target as any);

		// Get the values of email and password fields
		const email = formData.get("email");
		const password = formData.get("password");

		console.log("Email: ", email, "Password: ", password);

		const result = await onSignInById("domain-login", {
			email,
			password,
		});
	};

	const [name, setName] = useState("");

	return (
		<>
			<form className="flex w-full max-w-xs flex-col items-center justify-center gap-2" onSubmit={onSubmit}>
				<label className="pointer-events-all relative m-1 w-full">
					<span className="mr-4">Email:</span>
					<input
						className="input input-bordered input-primary  w-full"
						placeholder={"Nhập Email..."}
						name="email"
						type="email"
					/>
				</label>

				<label className="pointer-events-all relative m-1 w-full">
					<span className="mr-4">Password:</span>
					<input
						className="input input-bordered input-primary w-full"
						placeholder={"Nhập Password..."}
						name="password"
						type="password"
					/>
				</label>

				<button className="btn btn-primary btn-wide m-1 " type="submit">
					<TbLogin2 size={30} />
					Login
				</button>
			</form>
		</>
	);
};

export default LoginPassword;
