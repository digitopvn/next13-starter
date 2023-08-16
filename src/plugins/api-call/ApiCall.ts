/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import type { AxiosRequestConfig } from "axios";
import Axios from "axios";

import { AppConfig } from "@/modules/config/AppConfig";
import { toFormData, toQueryString } from "@/plugins/api-call/helper";
import errorRecord from "@/plugins/api-call/helper/errorRecord";

export interface IApiCall {
	url?: string;
	path?: string;
	baseUrlPath?: string;
	method?: string;
	data?: any;
	params?: any;
	token?: string;
	contentType?: 1 | "1" | "multipart/form-data" | 2 | "2" | "json" | "application/json" | 3 | "3" | "formdata";
	headers?: any;
}

const ApiCall = async ({
	url,
	path,
	baseUrlPath,
	method = "GET",
	data = {},
	token,
	contentType,
	headers = {},
	params = {},
}: IApiCall): Promise<{
	statusCode?: number;
	data?: any;
	status: boolean | string;
	message?: string[] | string;
}> => {
	let api;
	const axiosOption = {
		timeout: 1000 * 30, // Wait for 30 seconds
		url:
			url ||
			`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}` ||
			`${process.env.NEXT_PUBLIC_BASE_URL}${baseUrlPath}`,
		method,
		headers: { ...headers },
		params: { ...params },
	} as AxiosRequestConfig;

	if (method.toUpperCase() !== "GET")
		switch (contentType) {
			case "1":
			case 1:
			case "multipart/form-data":
				{
					const form = toFormData(data);
					axiosOption.headers = {
						...axiosOption.headers,
						"Content-Type": "multipart/form-data",
					};

					axiosOption.maxBodyLength = Infinity;
					axiosOption.maxContentLength = Infinity;

					axiosOption.data = form;
				}
				break;

			case "2":
			case 2:
			case "json":
			case "application/json":
				{
					axiosOption.headers = {
						...axiosOption.headers,
						"Content-Type": "application/json",
					};
					// axiosOption.maxBodyLength = Infinity;
					// axiosOption.maxContentLength = Infinity;
					try {
						axiosOption.data = JSON.stringify(data);
					} catch (error) {
						console.error(`axiosOption.data = JSON.stringify(data); error`, error);
					}
				}
				break;

			case "3":
			case 3:
			case "formdata":
				{
					axiosOption.headers = {
						...axiosOption.headers,
						"Content-Type": "multipart/form-data",
					};
					axiosOption.maxBodyLength = Infinity;
					axiosOption.maxContentLength = Infinity;
					axiosOption.data = data;
				}
				break;

			default:
				{
					axiosOption.headers = {
						...axiosOption.headers,
						"Content-Type": "application/x-www-form-urlencoded",
					};
					const form = toFormData(data);
					axiosOption.data = toQueryString(form);
				}
				break;
		}

	if (token) (axiosOption as any).headers.Authorization = `Bearer ${token}`;

	let error;
	// console.log('axiosOption :>> ', axiosOption);
	try {
		api = await Axios(axiosOption);
	} catch (e: any) {
		if ((e as any)?.response?.data) {
			api = (e as any)?.response;
		} else {
			console.log("error api with", e);
			const { code, message, name } = e;
			const response = {
				data: (e as any)?.response?.data || "undefined",
				status: (e as any)?.response?.status || "",
				statusText: (e as any)?.response?.statusText || "",
			};

			error = {
				code,
				message,
				name,
				response,
			};
		}
	}

	if (!api) {
		const opt = {
			fromOrigin: `server-side ${AppConfig.getBaseUrl()}`,
			axiosOption,
			error,
		};
		if (typeof window !== "undefined") {
			opt.fromOrigin = window.location?.href || AppConfig.getBaseUrl();
		}
		const res = await errorRecord(opt);
		if (res.status) {
			api = res;
		} else
			api = {
				status: false,
				message: error?.message,
			};
	} else {
		return api.data;
	}

	return api;
};

export default ApiCall;
