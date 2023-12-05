import { createHmac } from "crypto";

import { env } from "@/env.mjs";

export default function generateHmacAuth(message: string): string {
	const hmac = createHmac("sha256", env.HMAC_KEY || "")
		.update(message)
		.digest("hex");
	return hmac;
}

export { generateHmacAuth };
