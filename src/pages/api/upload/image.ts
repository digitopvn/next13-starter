import { getResponse, getSuccessResponse } from "diginext-utils/dist/response";

import proxyImage from "@/plugins/upload/proxyImage";

export const config = {
	api: {
		bodyParser: false,
	},
};

// src/pages/api/upload/image.ts
const handler = async (req: any, res: any) => {
	try {
		//
		switch (req.method) {
			case "post":
			case "POST":
				{
					return await proxyImage(req, res);
				}
				break;

			case "get":
			case "GET":
				{
					return res.status(200).json(getSuccessResponse(null, ""));
				}
				break;

			default:
				break;
		}
	} catch (error) {
		console.log(`handler error`, error);
	}

	return res.status(400).json(getResponse());
};

export default handler;
