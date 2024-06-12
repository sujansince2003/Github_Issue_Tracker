import prisma from "@/prisma/PrismaClient";
import React from "react";

import { notFound } from "next/navigation";
import { Heading, Text, Flex, Card, Grid, Box, Button } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
interface Props {
  params: { id: string };
}
const page = async ({ params }: Props) => {
  const issueInfo = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issueInfo) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <Heading> {issueInfo?.title}</Heading>

        <Flex gap={"4"} my={"2"}>
          <IssueStatusBadge status={issueInfo.status} />
          <Text>{issueInfo.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <Text>
            <ReactMarkdown>{issueInfo?.description}</ReactMarkdown>
          </Text>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issueInfo.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default page;
