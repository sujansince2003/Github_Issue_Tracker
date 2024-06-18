import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/PrismaClient"
import { Issueschema } from "@/app/zodvalidationSchemas";


export async function GET() {
    const newIssue = await prisma.issue.findMany()

    return NextResponse.json(newIssue, { status: 200 })
}
export async function POST(request: NextRequest) {
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
