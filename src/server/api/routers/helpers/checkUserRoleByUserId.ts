import { prisma } from "@/server/db";

export default async function checkUserRoleByUserIdAsync(id: string, roles: Array<string>) {
	//

	const userWithRoles = await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			userRoles: {
				include: {
					role: {
						select: {
							name: true,
						},
					},
				},
			},
		},
	});

	const userRoles = userWithRoles?.userRoles.map((ur) => ur?.role?.name) || [];
	const allowRoles = new Set([...roles]);

	const _list = userRoles.filter((item) => allowRoles.has(item));
	return _list.length > 0;
}
