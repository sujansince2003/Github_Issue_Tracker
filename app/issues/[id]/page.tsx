import prisma from "@/prisma/PrismaClient";
import { notFound } from "next/navigation";
import { Grid, Box } from "@radix-ui/themes";
import EditIssuebtn from "./EditIssuebtn";
import IssueDetails from "./IssueDetails";

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
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <IssueDetails issueInfo={issueInfo} />
      </Box>
      <Box>
        <EditIssuebtn issueId={issueInfo.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailspage;
