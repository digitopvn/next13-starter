import { createHmac } from "crypto";

import { env } from "@/env.mjs";

export default function generateHmac(message: string): string {
	const hmac = createHmac("sha256", env.SECRET_UPLOAD_KEY || "teexiii")
		.update(message)
		.digest("hex");
	return hmac;
}

export { generateHmac };
