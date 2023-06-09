import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { Meta } from "@/components/layouts/Meta";

const GlobalStyle = dynamic(() => import("@/styles/GlobalStyle"), { ssr: false });
const Providers = dynamic(() => import("@/components/context/compose/Providers"), { ssr: false });

type IMainProps = {
	meta?: { pageName?: string; description?: string };
	children?: ReactNode;
};

const MasterPage = (props: IMainProps) => (
	<>
		<Meta pageName={props.meta?.pageName} description={props.meta?.description} />

		<GlobalStyle />

		<Providers {...props}>
			<main className="content">{props.children}</main>
		</Providers>
	</>
);

export default MasterPage;
