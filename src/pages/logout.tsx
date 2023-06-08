// import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import MasterPageAuth from "@/components/layouts/MasterPageAuth";

const UILogout = dynamic(() => import("@/components/router/UILogout"), { ssr: false });

const Index = () => {
	// const router = useRouter();

	return (
		<>
			<style global jsx>{`
				html,
				body {
					background-color: black;
					color: white;
				}
			`}</style>

			<MasterPageAuth
				meta={{
					pageName: "Trang Chủ",
					description: "diginext13",
				}}
			>
				<UILogout />
			</MasterPageAuth>
		</>
	);
};

export default Index;
