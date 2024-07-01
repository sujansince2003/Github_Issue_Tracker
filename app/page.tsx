import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/PrismaClient";
import IssueCharts from "./IssueCharts";
import { Flex, Grid } from "@radix-ui/themes";

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
      <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
        <Flex direction={"column"} gap={"5"}>
          <IssueSummary
            openNum={openNum}
            closedNum={closedNum}
            inProgressNum={inProgressNum}
          />
          <IssueCharts
            openNum={openNum}
            closedNum={closedNum}
            inProgressNum={inProgressNum}
          />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
}
