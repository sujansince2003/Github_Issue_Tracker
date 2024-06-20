import prisma from "@/prisma/PrismaClient";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany(
        {
            orderBy: { name: "asc" }
        }
    )
    if (!users)
        return NextResponse.json({ error: "failed to retrieve users data" }, { status: 404 })
    return NextResponse.json(users, { status: 200 })
}


