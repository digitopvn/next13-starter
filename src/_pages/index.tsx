// import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import MasterPageAuth from "@/components/layouts/MasterPageAuth";

const UIHome = dynamic(() => import("@/components/router/UIHome"), { ssr: false });

const Index = () => {
	// const router = useRouter();

	return (
		<>
			<MasterPageAuth
				isPrivate={false}
				meta={{
					title: "Trang Chủ",
				}}
			>
				<UIHome />
			</MasterPageAuth>
		</>
	);
};

export default Index;
