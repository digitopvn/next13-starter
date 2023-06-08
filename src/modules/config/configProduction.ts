import getConfig from "next/config";

import { IsProd } from "@/modules/config/AppConfig";

export const configProduction = {
	consoleHandle: async (isShowCredit = true) => {
		if (IsProd()) {
			const { disableConsole, showCredit } = await import("diginext-utils/dist/xconsole");

			if (typeof window === "undefined") {
				//
			} else if (isShowCredit) {
				const { publicRuntimeConfig } = getConfig();
				const { version } = publicRuntimeConfig;
				console.clear();
				showCredit(version);
			}

			disableConsole();
		}
	},
};
