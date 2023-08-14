/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { toArray, toBool, toInt } from "diginext-utils/dist/object";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

import { useStorage } from "@/components/context/StorageProvider";
import type { IApiCall } from "@/plugins/api-call/ApiCall";
import ApiCall from "@/plugins/api-call/ApiCall";

interface IContext {
	call: ({ showNotif, isEncrypt, ...options }: ICall) => Promise<any>;
	POST: (options: ICall) => Promise<any>;
	PUT: (options: ICall) => Promise<any>;
	GET: (options: ICall) => Promise<any>;
	DELETE: (options: ICall) => Promise<any>;
	PATCH: (options: ICall) => Promise<any>;
	encryptData: (data: any) => Promise<any>;
	decryptData: (str: string, encKey: string | number) => Promise<any>;
}

interface ICall extends IApiCall {
	showNotif?: boolean;
	isEncrypt?: boolean;
}

export const ApiContext = createContext<IContext | undefined>(undefined);

const ApiProvider = (props: any) => {
	const key = "2!VuS^0(bJ4rls20ua.RQX7e";
	const router = useRouter();

	const { token } = useStorage();

	const encryptData = async (data: any) => {
		// const AES = (await import("crypto-js/aes")).default;
		// const encKey = new Date().getTime();
		// return {
		// 	data: AES.encrypt(JSON.stringify(data), `${key}${encKey}`).toString(),
		// 	encKey,
		// };
	};

	const decryptData = async (str: string, encKey: string | number) => {
		// const AES = (await import("crypto-js/aes")).default;
		// const enc = (await import("crypto-js")).default.enc;
		// const json = AES.decrypt(str, `${key}${encKey}`).toString(enc.Utf8);
		// try {
		// 	const obj = JSON.parse(json);
		// 	return obj;
		// } catch (error) {
		// 	console.error(`decryptData error`, error);
		// }
		// return json;
	};

	const call = async ({ showNotif = false, isEncrypt = false, ...options }: ICall) => {
		if (token) options.token = token;
		if (isEncrypt) {
			if (options.data) options.data = await encryptData(options.data);
		}

		options.contentType = options.contentType || "json";

		let res = await ApiCall(options);

		if (res) {
			if (isEncrypt) {
				if (res.data?.data && res.data?.encKey) {
					console.log("data encrypt :>> ", res.data);
					res.data = await decryptData(res.data?.data, res.data?.encKey);
					console.log("data decrypt :>> ", res.data);
				}
			}

			try {
				const msgs = toArray(res.message as any);
				const isError = !toBool(res?.status as any);

				// show error notification even if it's disabled
				if (isError) {
					const { showNotifications } = await import("@/plugins/notifications");
					showNotifications(msgs as any, isError);
				} else if (showNotif) {
					const { showNotifications } = await import("@/plugins/notifications");
					showNotifications(msgs as any, isError);
				}
			} catch (error) {
				console.error("error at calling api", error);
			}
		} else {
			console.warn("Vui lòng kiểm tra lại thông tin!");
			res = {
				status: false,
				message: "Vui lòng kiểm tra lại thông tin!",
			};
		}

		switch (toInt(res?.statusCode || 0)) {
			case 401:
			case 403:
				{
					router.push("/logout");
				}
				break;

			default:
				break;
		}

		return res;
	};

	const POST = async (options: IApiCall) => {
		const res = await call({
			showNotif: true,
			...options,
			method: "POST",
		});

		return res;
	};

	const PUT = async (options: IApiCall) => {
		const res = await call({
			showNotif: true,
			...options,
			method: "PUT",
		});
		return res;
	};

	const DELETE = async (options: IApiCall) => {
		const res = await call({
			showNotif: true,
			...options,
			method: "DELETE",
		});
		return res;
	};

	const PATCH = async (options: IApiCall) => {
		const res = await call({
			showNotif: true,
			...options,
			method: "PATCH",
		});
		return res;
	};

	const GET = async (options: IApiCall) => {
		const res = await call({
			...options,
			method: "GET",
		});
		return res;
	};

	return (
		<ApiContext.Provider
			value={{
				call,
				POST,
				PUT,
				GET,
				DELETE,
				PATCH,
				encryptData,
				decryptData,
			}}
		>
			{props.children}
		</ApiContext.Provider>
	);
};

export default ApiProvider;

export const useApiProvider = () => {
	const context = useContext(ApiContext);
	if (!context) {
		throw new Error("useApiProvider has to be used within <ApiContext.Provider>");
	}
	return context;
};
