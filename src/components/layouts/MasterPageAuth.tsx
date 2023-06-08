import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { Meta } from "@/components/layouts/Meta";
import { gaIds } from "@/plugins/tracking";

const GlobalStyle = dynamic(() => import("@/styles/GlobalStyle"), { ssr: false });
const Providers = dynamic(() => import("@/components/context/compose/Providers"), { ssr: false });
const ProvidersAuth = dynamic(() => import("@/components/context/compose/ProvidersAuth"), { ssr: false });

type IMainProps = {
	isPrivate?: boolean;
	meta?: { pageName?: string; description?: string };
	children?: ReactNode;
};

const MasterPageAuth = (props: IMainProps) => {
	const pageName = props.meta?.pageName || "";

	const router = useRouter();

	useEffect(() => {
		(async () => {
			const gaPage = (await import("@/plugins/tracking")).gaPage;
			if (gaIds?.length) {
				gaPage(router.asPath, pageName);
			}
		})();

		return () => {};
	}, []);

	return (
		<>
			<Meta pageName={pageName} description={props.meta?.description} />

			<GlobalStyle />

			<SessionProvider>
				<Providers {...props}>
					<ProvidersAuth {...props}>
						<main className="content">{props.children}</main>
					</ProvidersAuth>
				</Providers>
			</SessionProvider>
		</>
	);
};

export default MasterPageAuth;
