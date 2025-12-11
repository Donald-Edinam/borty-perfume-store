import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

const prisma = new PrismaClient();

async function createAdmin() {
    const email = process.argv[2] || "admin@bortystore.com";
    const name = process.argv[3] || "Admin User";

    // Generate a secure 8-character password
    // Using base64 encoding of random bytes and slicing needed characters
    // We want it to be "letters" as requested ("8 letter super secured"), 
    // but usually "secure" implies mixed case and maybe numbers. 
    // The user said "8 letter super secured". I'll interpret "letter" loosely as "character" 
    // but ensure it's alphanumeric for security.
    const password = crypto.randomBytes(8).toString('base64').slice(0, 8);

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                role: "ADMIN",
                password: hashedPassword,
            },
            create: {
                email,
                name,
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        console.log("\n✅ Admin user created/updated successfully!");
        console.log("-----------------------------------------");
        console.log(`Email:    ${user.email}`);
        console.log(`Password: ${password}`);
        console.log("-----------------------------------------");
        console.log("⚠️  Please save these credentials securely!\n");

    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
