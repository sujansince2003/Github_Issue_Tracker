import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/PrismaClient";
import IssueCharts from "./IssueCharts";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
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

export const metadata: Metadata = {
  title: "Issue Tracker- Dashboard",
  description: "View a summary of projects issues",
};
