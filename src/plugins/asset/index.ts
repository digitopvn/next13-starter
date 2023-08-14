import { toBool } from "diginext-utils/dist/object";

import { AppConfig, IsLocal } from "@/modules/config/AppConfig";

const asset = (src: string, isEnabledCDN?: boolean) => {
	isEnabledCDN =
		typeof isEnabledCDN !== "undefined" ? isEnabledCDN : toBool(process.env.NEXT_PUBLIC_USE_CDN || "") || false;
	const isEnableBasePath = toBool(process.env.NEXT_PUBLIC_BASE_PATH || "") || false;

	if (isEnabledCDN) {
		src = src.replace(`${AppConfig.getBasePath("/public")}`, "");
		return `${process.env.NEXT_PUBLIC_CDN_BASE_PATH}/public${process.env.NEXT_PUBLIC_VERSION_CDN}${src}`;
	}
	if (isEnableBasePath) {
		src = src.replace(`/${AppConfig.getBasePath()}`, "");
		return `/${AppConfig.getBasePath(src)}`;
	}

	if (IsLocal()) return src;

	return AppConfig.getBaseUrl(src);
};

export default asset;
