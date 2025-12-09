import { NextResponse } from "next/server";
import { db } from "@server/db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

async function verifyPassword(stored: string, supplied: string) {
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
}

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ message: "Username dan password harus diisi" }, { status: 400 });
        }

        const user = await db.select().from(users).where(eq(users.username, username)).get();

        if (!user) {
            return NextResponse.json({ message: "Username atau password salah" }, { status: 401 });
        }

        const isValid = await verifyPassword(user.password, password);

        if (!isValid) {
            return NextResponse.json({ message: "Username atau password salah" }, { status: 401 });
        }

        (await cookies()).set("userId", user.id, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Error" }, { status: 500 });
    }
}
