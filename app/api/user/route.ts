import { NextResponse } from "next/server";
import { db } from "@server/db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await db.select().from(users).where(eq(users.id, userId)).get();

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
}
