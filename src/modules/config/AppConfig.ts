// FIXME: Update this configuration file based on your project information

import { toBool } from "diginext-utils/dist/object";

export const Environment = {
	PRODUCTION: "production",
	STAGING: "staging",
	DEVELOPMENT: "development",
	CANARY: "canary",
	LOCAL: "local",
};

export const AppConfig = {
	environment: process.env.NEXT_PUBLIC_ENV || "development",
	site_name: "Top Group",
	locale: "vi",

	ENV_SHORT:
		process.env.NEXT_PUBLIC_ENV === Environment.PRODUCTION
			? "prod"
			: process.env.NEXT_PUBLIC_ENV?.substring?.(0, 3),

	DEBUG: toBool(process.env.NEXT_PUBLIC_DEBUG),

	title: "Digitop",
	description: "Starter",

	getBaseUrl: (url = "") => {
		return process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}${url}` : url;
	},

	getBasePath: (url = "") => {
		return process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}${url}` : url;
	},

	getCDNPath: (url = "") => {
		return process.env.NEXT_PUBLIC_CDN_ROOT
			? `${process.env.NEXT_PUBLIC_CDN_ROOT}${process.env.NEXT_PUBLIC_VERSION_CDN}${url}`
			: url;
	},
};

export const IsDev = () => {
	return AppConfig.environment === Environment.DEVELOPMENT;
};

export const IsStag = () => {
	return AppConfig.environment === Environment.STAGING;
};

export const IsProd = () => {
	return AppConfig.environment === Environment.PRODUCTION;
};

export const IsCanary = () => {
	return AppConfig.environment === Environment.CANARY;
};

export const IsLocal = () => {
	return AppConfig.environment === Environment.LOCAL;
};
