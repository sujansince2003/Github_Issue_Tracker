import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/PrismaClient";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string }; //page represent pagenumber which should be number but we are using string because we are getting from URL.we will manually convert it to number
}) {
  const openNum = await prisma.issue.count({ where: { status: "OPEN" } });
  const closedNum = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgressNum = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <>
      <LatestIssues />
      {/* <Pagination
        itemCount={50}
        pageSize={5}
        currentPage={parseInt(searchParams.page)}
      /> */}

      <IssueSummary
        openNum={openNum}
        closedNum={closedNum}
        inProgressNum={inProgressNum}
      />
    </>
  );
}
