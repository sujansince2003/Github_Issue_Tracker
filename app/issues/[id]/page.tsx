import prisma from "@/prisma/PrismaClient";
import React from "react";
import delay from "delay";
import { notFound } from "next/navigation";
import { Heading, Text, Flex, Card } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
interface Props {
  params: { id: string };
}
const page = async ({ params }: Props) => {
  await delay(2000);
  const issueInfo = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issueInfo) notFound();
  return (
    <div>
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
    </div>
  );
};

export default page;
