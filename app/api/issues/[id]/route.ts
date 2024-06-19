import authOptions from "@/app/auth/AuthOptions";
import { Issueschema } from "@/app/zodvalidationSchemas";
import prisma from "@/prisma/PrismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest,
    { params }: { params: { id: string } }) {
    const session = getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: "need authorization" }, { status: 401 })
    const body = await request.json()
    const validation = Issueschema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })


    const issue = await prisma.issue.findUnique(
        {
            where:
            {
                id: params.id
            }
        }
    )
    if (!issue)
        return NextResponse.json({ error: "Invalid issue" }, { status: 404 })

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data:
        {
            title: body?.title,
            description: body?.description
        }
    })

    return NextResponse.json(updatedIssue)
}




export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: "need authorization" }, { status: 401 })
    const issue = await prisma.issue.findUnique(
        {
            where:
            {
                id: params.id
            }
        }
    )
    if (!issue)
        return NextResponse.json({ error: "Invalid issue id or issue" }, { status: 404 })
    const deletedIssue = await prisma.issue.delete(
        {
            where:
            {
                id: issue?.id
            }
        }
    )
    return NextResponse.json({ success: "Issue Deleted Successfully", deletedIssue }, { status: 200 })


}