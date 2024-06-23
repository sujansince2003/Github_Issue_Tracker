import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/PrismaClient"
import { Issueschema } from "@/app/zodvalidationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";
import { Status } from "@prisma/client";



export async function GET(request: NextRequest) {
    const session = getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: "need authorization" }, { status: 401 })

    // getting search params 

    const url = new URL(request.url);
    const filterQuery = url.searchParams.get("status")


    // defining a function to check if a given filterQuery params is valid Status value defined in schema
    const isValidStatus = (status: string | null): status is Status => {
        return status === "OPEN" || status === "CLOSED" || status === "IN_PROGRESS"
    }

    const whereClause = isValidStatus(filterQuery) ? { status: filterQuery } : {}

    const newIssue = await prisma.issue.findMany(
        {
            where: whereClause
        }
    )

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
