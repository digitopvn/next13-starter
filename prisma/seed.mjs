// @ts-nocheck
import { PrismaClient } from "@prisma/client";

import Axios from "axios";

const prisma = new PrismaClient();

async function main() {
	// Check if permission exists, if not create
	async function findOrCreatePermission(name) {
		const existingPermission = await prisma.permission.findFirst({
			where: { name },
		});
		if (!existingPermission) {
			return prisma.permission.create({ data: { name } });
		}
		return existingPermission;
	}

	// Check if role exists, if not create
	async function findOrCreateRole(name, permissions) {
		const existingRole = await prisma.role.findFirst({ where: { name } });

		if (!existingRole) {
			const rolePermissions = permissions.map((permission) => ({
				permission: { connect: { id: permission.id } },
			}));
			return prisma.role.create({
				data: {
					name,
					rolePermissions: {
						create: rolePermissions,
					},
				},
			});
		}
		return existingRole;
	}

	// In your seed script
	const writePermission = await findOrCreatePermission("Write");
	const readPermission = await findOrCreatePermission("Read");

	const adminRole = await findOrCreateRole("Admin", [writePermission, readPermission]);
	const viewerRole = await findOrCreateRole("Viewer", [readPermission]);

	const findOrCreateUser = async (providerAccountId) => {
		let existingUser = await prisma.user.findUnique({ where: { providerAccountId } });

		if (!existingUser) {
			// Create default User_1 with Admin role
			existingUser = await prisma.user.create({
				data: {
					name: "Admin",
					providerAccountId, // you need to provide this value
					password: "80e29ca4b22fbae54fdd0a77e31487f2e8cc7b250e89e75c0c62eebf8a2f0146",
					email: "admin@digitop.vn",
					userRoles: {
						create: {
							role: {
								connect: {
									id: adminRole.id,
								},
							},
						},
					},
				},
			});

			//
			//create token api
			const result = await Axios({
				url: `${process.env.NEXT_PUBLIC_API_UPLOAD_STORAGE}/v3/auth/create-token`,
				method: "POST",
				data: JSON.stringify({
					user: {
						id: existingUser.id,
						name: existingUser.name,
						email: existingUser.email || existingUser.emailOriginal,
						providerAccountId: existingUser.providerAccountId,
					},
				}),
				headers: {
					"Content-Type": "application/json",
				},

				// contentType: "json",
			});
			// console.log("result :>> ", result);
			// if (result.status) {
			const { data } = result;
			if (data.data?.token?.key) {
				const updatedUser = await prisma.user.update({
					where: { id: existingUser.id },
					data: {
						token: {
							create: {
								key: data.data?.token?.key,
							},
						},
					},
					select: { token: true },
				});
			}
			// if (!data) return;
			// }
		}

		return existingUser;
	};

	const admin = await findOrCreateUser(`Credentials-diginext13-admin`);

	console.log("Seed done");
}

// Execute the main function
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
