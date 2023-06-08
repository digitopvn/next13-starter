// import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import MasterPageAuth from "@/components/layouts/MasterPageAuth";

const UIHome = dynamic(() => import("@/components/router/UIHome"), { ssr: false });

const Index = () => {
	// const router = useRouter();

	return (
		<>
			<style global jsx>{`
				html,
				body {
					overflow: hidden;
				}

				* {
					-webkit-touch-callout: none; /* iOS Safari */
					-webkit-user-select: none; /* Safari */
					-khtml-user-select: none; /* Konqueror HTML */
					-moz-user-select: none; /* Old versions of Firefox */
					-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
					touch-action: none;
				}
			`}</style>

			<MasterPageAuth
				isPrivate={false}
				meta={{
					pageName: "Trang Chủ",
				}}
			>
				<UIHome />
			</MasterPageAuth>
		</>
	);
};

export default Index;
