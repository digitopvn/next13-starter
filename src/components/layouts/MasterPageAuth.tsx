import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { Meta } from "@/components/layouts/Meta";

const GlobalStyle = dynamic(() => import("@/styles/GlobalStyle"), { ssr: false });
const Providers = dynamic(() => import("@/components/context/compose/Providers"), { ssr: false });
const ProvidersAuth = dynamic(() => import("@/components/context/compose/ProvidersAuth"), { ssr: false });

interface IMainProps {
	isPrivate?: boolean;
	meta?: { title?: string; description?: string };
	children?: ReactNode;
}

const MasterPageAuth = (props: IMainProps) => {
	const title = props.meta?.title || "";

	const router = useRouter();

	useEffect(() => {
		(async () => {
			const gaPage = (await import("@/plugins/tracking")).gaPage;
			const gaIds = (await import("@/plugins/tracking")).gaIds;
			try {
				if (gaIds?.length) {
					gaPage(router.asPath, title);
				}
			} catch (error) {
				console.error(`metname error`, error);
			}
		})();
		return () => {};
	}, []);

	return (
		<>
			<Meta title={title} description={props.meta?.description} />

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
