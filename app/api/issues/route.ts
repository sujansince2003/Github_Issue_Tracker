import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/PrismaClient"
import { Issueschema } from "@/app/zodvalidationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";
import { Status, Issue } from "@prisma/client";



export async function GET(request: NextRequest) {
    const session = getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: "need authorization" }, { status: 401 })

    // getting search params 

    const url = new URL(request.url);
    const filterQuery = url.searchParams.get("status")
    const orderByQuery = url.searchParams.get("orderBy")
    const sortBy = url.searchParams.get("sortBy")
    const page = url.searchParams.get("page")
    const pageSize = url.searchParams.get("pageSize")



    // defining a function to check if a given filterQuery params is valid Status value defined in schema
    const isValidStatus = (status: string | null): status is Status => {
        return status === "OPEN" || status === "CLOSED" || status === "IN_PROGRESS"
    }

    const whereClause = isValidStatus(filterQuery) ? { status: filterQuery } : {}

    //valdiating sortBy asc or desc
    const isValidSortBy = (sortBy: string | null) => {
        return sortBy === "desc" || sortBy === "asc"
    }

    const sortByclause = isValidSortBy(sortBy) ? sortBy : undefined
    // validating orderBy
    const isValidOrderBy = (key: string | null): key is keyof Issue => {
        const issueKeys: Array<keyof Issue> = [
            "id",
            "title",
            "description",
            "status",
            "createdAt",
            "updatedAt",
        ];
        return key !== null && issueKeys.includes(key as keyof Issue);
    };

    const orderByClause = isValidOrderBy(orderByQuery) ? { [orderByQuery]: sortByclause } : {}


    // validating pagenumber and pagesize

    const pageNum = page ? parseInt(page, 10) : 1
    const currentpageSize = pageSize ? parseInt(pageSize, 10) : 10

    if (isNaN(pageNum) || isNaN(currentpageSize)) {
        return NextResponse.json({ error: "Invalid page or pageSize value" }, { status: 400 });
    }



    const totalIssuesCount = await prisma.issue.count({
        where: whereClause
    })
    const Issues = await prisma.issue.findMany(
        {
            where: whereClause,
            orderBy: orderByClause,
            skip: (pageNum - 1) * 10,
            take: currentpageSize
        }
    )








    // return NextResponse.json({ newIssue, orderByClause, whereClause }, { status: 200 })
    return NextResponse.json({ Issues, totalIssuesCount }, { status: 200 })
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
