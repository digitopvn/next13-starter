import type { Role } from "@prisma/client";

export default function checkUserRoleClient(userWithRoles: Array<Role>, roles: Array<string>) {
	//

	const userRoles = userWithRoles.map((ur) => ur?.name) || [];
	const allowRoles = new Set([...roles]);

	const _list = userRoles.filter((item) => allowRoles.has(item));
	return _list.length > 0;
}
