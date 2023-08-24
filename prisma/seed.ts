import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Create permissions
	const writePermission = await prisma.permission.create({
		data: { name: "Write" },
	});
	const readPermission = await prisma.permission.create({
		data: { name: "Read" },
	});

	// Create Admin role with Write and Read permissions
	const adminRole = await prisma.role.create({
		data: {
			name: "Admin",
			rolePermissions: {
				create: [
					{ permission: { connect: { id: writePermission.id } } },
					{ permission: { connect: { id: readPermission.id } } },
				],
			},
		},
	});

	// Create Viewer role with Read permission
	await prisma.role.create({
		data: {
			name: "Viewer",
			rolePermissions: {
				create: [{ permission: { connect: { id: readPermission.id } } }],
			},
		},
	});

	// Create default User_1 with Admin role
	await prisma.user.create({
		data: {
			name: "User_1",
			providerAccountId: "some_unique_value_here", // you need to provide this value
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
