import "../styles/tailwind.scss";

import type { AppProps } from "next/app";

import { api } from "@/plugins/trpc/api";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);

(async () => {
	const { configProduction } = await import("@/modules/config/configProduction");
	configProduction.consoleHandle();
})();
