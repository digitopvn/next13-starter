import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import MasterPageAuth from "@/components/layouts/MasterPageAuth";
import getServerRoleGate from "@/plugins/roles/getServerRoleGate";
import { getServerAuthSession } from "@/server/auth";

// /role
const Role = () => {
	return (
		<>
			<MasterPageAuth
				roles={["Admin"]}
				isPrivate={true}
				meta={{
					title: "Role",
				}}
			>
				<h1 className="text-4xl"> Page này dành cho role Admin</h1>
			</MasterPageAuth>
		</>
	);
};

export default Role;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
	return getServerRoleGate(ctx, ["Admin"]);
};
