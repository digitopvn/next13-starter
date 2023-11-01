import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import MasterPageAuth from "@/components/layouts/MasterPageAuth";

// /src/pages/role/test-role-admin-use-provider.tsx
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
