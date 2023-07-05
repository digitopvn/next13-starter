import getConfig from "next/config";

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
				const { publicRuntimeConfig } = getConfig();
				const { version } = publicRuntimeConfig;
				showCredit(version);
			}

			disableConsole();
		} else {
			if (isShowCredit) {
				const { publicRuntimeConfig } = getConfig();
				const { version } = publicRuntimeConfig;
				showCredit(version);
			}
		}
	},
};
