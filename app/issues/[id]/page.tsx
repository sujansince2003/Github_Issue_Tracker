import prisma from "@/prisma/PrismaClient";
import React from "react";
import delay from "delay";
import { notFound } from "next/navigation";
import { Heading, Text, Flex, Card } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";

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
      <Card>
        <Text>{issueInfo?.description}</Text>
      </Card>
    </div>
  );
};

export default page;
