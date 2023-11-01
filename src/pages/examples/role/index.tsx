import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import MasterPageAuth from "@/components/layouts/MasterPageAuth";
import { getServerAuthSession } from "@/server/auth";

const PageRole = dynamic(() => import("@/components/router/PageRole"), { ssr: false });

// /examples/role
const Role = () => {
	return (
		<>
			<MasterPageAuth
				isPrivate={true}
				meta={{
					title: "Role",
				}}
			>
				<PageRole />
			</MasterPageAuth>
		</>
	);
};

export default Role;
