import getStringFromNextJsRouter from "diginext-utils/dist/string/getStringFromNextJsRouter";
import FormData from "form-data";
import type formidable from "formidable";
import fs from "fs";

import { AppConfig } from "@/modules/config/AppConfig";
import generateHmac from "@/plugins/crypto/generateHmac";

export default function convertToFormData([fields, files]: [fields: any, files: formidable.Files<string>]) {
	//
	const file = files.file?.[0];

	if (!file) throw new Error("Can't load file!");

	const { filepath, originalFilename, mimetype, size } = file;

	const hmac = generateHmac(`${size}`);
	const formData = new FormData();

	Object.keys(fields).forEach((key) => {
		formData.append(key, getStringFromNextJsRouter(fields[key]));
	});

	formData.append("project", AppConfig.name);
	formData.append("hmac", hmac);
	formData.append("file", fs.createReadStream(filepath), {
		filename: originalFilename || filepath.split("/").pop(),
		contentType: mimetype || "application/octet-stream",
	});

	return formData;
}
