import { PrismaClient } from "@prisma/client";

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

	// // Create default User_1 with Admin role
	// await prisma.user.create({
	// 	data: {
	// 		name: "User_1",
	// 		providerAccountId: "some_unique_value_here", // you need to provide this value
	// 		userRoles: {
	// 			create: {
	// 				role: {
	// 					connect: {
	// 						id: adminRole.id,
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// });

	console.log("Seeding completed!");
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
