import "../styles/tailwind.css";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;

(async () => {
	const { configProduction } = await import("@/modules/config/configProduction");
	configProduction.consoleHandle();
})();
