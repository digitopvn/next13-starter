import checkUserRoleByUserIdAsync from "@/server/api/routers/helpers/checkUserRoleByUserId";
import { getServerAuthSession } from "@/server/auth";

export default async function getServerRoleGate(ctx: any, roles: Array<string>) {
	//

	const session = await getServerAuthSession(ctx);
	const id = session?.user.id || "";

	if (!id)
		return {
			redirect: {
				destination: "/role",
				permanent: false,
			},
		};

	const isAllow = await checkUserRoleByUserIdAsync(id, ["Admin", ...roles]);

	if (isAllow) {
		return {
			props: { session },
		};
	} else {
		//
		return {
			redirect: {
				destination: "/role",
				permanent: false,
			},
		};
	}
}
