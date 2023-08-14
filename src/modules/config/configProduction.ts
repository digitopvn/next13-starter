import "server-only";

import getConfig from "next/config";

console.log("getConfig() :>> ", getConfig());

// Only holds serverRuntimeConfig and publicRuntimeConfig
// const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
// console.log("serverRuntimeConfig :>> ", serverRuntimeConfig);
// // Will only be available on the server-side
// console.log("serverRuntimeConfig :>> ", serverRuntimeConfig);
// // Will be available on both server-side and client-side
// console.log("publicRuntimeConfig :>> ", publicRuntimeConfig);

import { IsProd } from "@/modules/config/AppConfig";

export const configProduction = {
	consoleHandle: async (isShowCredit = true) => {
		const { showCredit } = await import("diginext-utils/dist/xconsole");

		if (IsProd()) {
			const { disableConsole } = await import("diginext-utils/dist/xconsole");

			if (typeof window === "undefined") {
				//
			} else {
				console.clear();
			}

			if (isShowCredit) {
				// const { publicRuntimeConfig } = getConfig();
				// const { version } = publicRuntimeConfig;
				// showCredit(version);
			}

			disableConsole();
		} else {
			if (isShowCredit) {
				// const { publicRuntimeConfig } = getConfig();
				// const { version } = publicRuntimeConfig;
				// showCredit(version);
			}
		}
	},
};
