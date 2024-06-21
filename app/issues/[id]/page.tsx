import prisma from "@/prisma/PrismaClient";
import { notFound } from "next/navigation";
import { Grid, Box, Flex, Text } from "@radix-ui/themes";
import EditIssuebtn from "./EditIssuebtn";
import IssueDetails from "./IssueDetails";
import DeleteIssueBtn from "./DeleteIssueBtn";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";
import AssignSelect from "./AssignSelect";

interface Props {
  params: { id: string };
}
const IssueDetailspage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
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

      {session && (
        <Flex className="flex-col gap-3 ">
          <AssignSelect issueInfo={issueInfo} />
          <EditIssuebtn issueId={issueInfo.id} />
          <DeleteIssueBtn issueId={issueInfo.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailspage;
