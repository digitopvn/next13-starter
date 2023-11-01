import "../styles/tailwind.scss";

import type { AppProps } from "next/app";

import { api } from "@/plugins/trpc/api";

/**
 * If you wanna warp anything, please go to
 * src/components/context/compose/Providers.tsx
 * or
 * src/components/context/compose/ProvidersAuth.tsx
 *
 * or make one yourself
 *
 * DO NOT WARP ANYTHING IN THIS FILE
 * DO NOT WARP ANYTHING IN THIS FILE
 * DO NOT WARP ANYTHING IN THIS FILE
 *
 */
const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);

(async () => {
	const { configProduction } = await import("@/modules/config/configProduction");
	configProduction.consoleHandle();
})();
