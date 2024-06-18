import prisma from "@/prisma/PrismaClient";
import { notFound } from "next/navigation";
import { Grid, Box, Flex } from "@radix-ui/themes";
import EditIssuebtn from "./EditIssuebtn";
import IssueDetails from "./IssueDetails";
import DeleteIssueBtn from "./DeleteIssueBtn";

interface Props {
  params: { id: string };
}
const IssueDetailspage = async ({ params }: Props) => {
  const issueInfo = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issueInfo) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetails issueInfo={issueInfo} />
      </Box>
      <Box className="flex flex-col gap-4">
        <EditIssuebtn issueId={issueInfo.id} />
        <DeleteIssueBtn issueId={issueInfo.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailspage;
