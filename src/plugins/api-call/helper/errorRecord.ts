/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import Axios from "axios";

import { isFile } from "@/plugins/api-call/helper";

const FormData = typeof window === "undefined" ? require("form-data") : window?.FormData;

const removeFile = (options: any) => {
	const _data = {} as any;
	const { axiosOption } = options;
	const { data } = axiosOption;

	if ((data as any) instanceof FormData) {
		for (const pair of (data as any)?.entries?.()) {
			const key = pair[0];
			const value = pair[1];

			if (isFile(value)) {
				const { name, size, type } = value;
				_data[key] = {
					name,
					size,
					type,
				};
			} else {
				_data[key] = value;
			}
		}
		(options as any).axiosOption.data = _data;
	}

	return options;
};

export default async function errorRecord(options: any) {
	//
	// NEXT_PUBLIC_API_ERROR_RECORD_URL="http://localhost:3008/api/v1/record-error"
	const url = process.env.NEXT_PUBLIC_API_ERROR_RECORD_URL;

	if (url)
		try {
			options = removeFile(options);
			options = JSON.stringify(options);

			const res = await Axios({
				headers: {
					"Content-Type": "application/json",
				},
				url,
				method: "POST",
				data: options,
			});

			if (res?.data?.status) {
				return res.data;
			}

			console.log("errorRecord res", res);
		} catch (error) {
			console.error(`errorRecord error`, error);
		}

	return {
		status: false,
		data: {
			code: -1,
		},
	};
}
