import { getFailedResponse, getResponse, getSuccessResponse } from "diginext-utils/dist/response";
import { isImageByMimeType } from "diginext-utils/dist/string/url";
import formidable from "formidable";

import { AppConfig } from "@/modules/config/AppConfig";
import ApiCall from "@/plugins/api-call/ApiCall";
import convertToFormData from "@/plugins/upload/convertToFormData";

export default async function proxyImage(req: any, res: any) {
	//
	try {
		const form = formidable({});
		const [fields, files] = await form.parse(req);

		const file = files.file?.[0];
		if (!file) return getFailedResponse("Không thể tải file !");

		const { mimetype } = file;

		if (mimetype) {
			if (!isImageByMimeType(mimetype)) {
				return getFailedResponse("Accept image only!");
			}
		}

		const formData = convertToFormData([fields, files]);

		const result = await ApiCall({
			method: "POST",
			url: AppConfig.getApiUploadStorage("/api/v1/upload/image"),
			data: formData,
			contentType: 3,
		});

		if (res.status) {
			const { data } = result;
			if (!data) return res.status(400).json(getFailedResponse(...(result.messages as any)));
			return res.status(200).json(getSuccessResponse(result.data));
		}
	} catch (error) {
		console.error(`metname error`, error);
	}

	return res.status(400).json(getResponse());
}
