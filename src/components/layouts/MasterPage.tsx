import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { Meta } from "@/components/layouts/Meta";

const GlobalStyle = dynamic(() => import("@/styles/GlobalStyle"), { ssr: false });
const Providers = dynamic(() => import("@/components/context/compose/Providers"), { ssr: false });

interface IMainProps {
	meta?: { title?: string; description?: string };
	children?: ReactNode;
}

const MasterPage = (props: IMainProps) => {
	const title = props.meta?.title || "";

	const pathname = usePathname();

	useEffect(() => {
		(async () => {
			const gaPage = (await import("@/plugins/tracking")).gaPage;
			const gaIds = (await import("@/plugins/tracking")).gaIds;
			try {
				if (gaIds?.length) {
					gaPage(pathname, title);
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

			<Providers {...props}>
				<main className="content">{props.children}</main>
			</Providers>
		</>
	);
};

export default MasterPage;
