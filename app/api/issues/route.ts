import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/PrismaClient"
import { Issueschema } from "@/app/zodvalidationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";
import { error } from "console";


export async function GET() {
    const session = getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: "need authorization" }, { status: 401 })
    const newIssue = await prisma.issue.findMany()

    return NextResponse.json(newIssue, { status: 200 })
}
export async function POST(request: NextRequest) {
    const session = getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: "need authorization" }, { status: 401 })
    const body = await request.json();

    const validation = Issueschema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })

    }

    const newIssue = await prisma.issue.create(
        {
            data:
            {
                title: body.title,
                description: body.description
            }
        }
    )

    return NextResponse.json(newIssue, { status: 200 })

}
