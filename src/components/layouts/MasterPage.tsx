import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { type ReactNode, useEffect } from "react";

import type { IMetaProps } from "@/components/layouts/Meta";
import { Meta } from "@/components/layouts/Meta";

const Providers = dynamic(() => import("@/components/context/compose/Providers"), { ssr: false });

interface IMainProps {
	meta?: IMetaProps;
	children?: ReactNode;
}

const MasterPage = (props: IMainProps) => {
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const gaPage = (await import("@/plugins/tracking")).gaPage;
			const gaIds = (await import("@/plugins/tracking")).gaIds;
			try {
				if (gaIds?.length) {
					gaPage(router.asPath, props.meta?.title || "");
				}
			} catch (error) {
				console.error(`metname error`, error);
			}
		})();
		return () => {};
	}, []);

	return (
		<>
			<Meta {...props?.meta} />

			<Providers {...props}>{props.children}</Providers>
		</>
	);
};

export default MasterPage;
