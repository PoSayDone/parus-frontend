import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/data/auth";

const prisma = new PrismaClient();

async function main() {
	const existingAdmin = await prisma.user.findUnique({
		where: { email: "admin@example.com" },
	});

	if (!existingAdmin) {
		const hashedPassword = await hashPassword("admin123");

		const adminUser = await prisma.user.create({
			data: {
				name: "Admin User",
				email: "admin@example.com",
				password: hashedPassword,
				role: "admin",
			},
		});

		console.log("Default admin user created:", adminUser.email);
	} else {
		console.log("Admin user already exists");
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
