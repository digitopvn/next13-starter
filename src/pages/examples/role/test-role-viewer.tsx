import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import MasterPageAuth from "@/components/layouts/MasterPageAuth";
import getServerRoleGate from "@/plugins/roles/getServerRoleGate";
import { getServerAuthSession } from "@/server/auth";

// /src/pages/role/test-role-viewer.tsx
const Role = () => {
	return (
		<>
			<MasterPageAuth
				isPrivate={true}
				meta={{
					title: "Role",
				}}
			>
				<h1 className="text-4xl"> Page này dành cho role Viewer</h1>
			</MasterPageAuth>
		</>
	);
};

export default Role;

// export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
// 	// no need
// 	return getServerRoleGate(ctx, ["Viewer"]);
// };
