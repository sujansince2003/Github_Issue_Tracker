import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issueInfo }: { issueInfo: Issue }) => {
  return (
    <>
      <Heading> {issueInfo?.title}</Heading>
      <Flex gap={"4"} my={"2"}>
        <IssueStatusBadge status={issueInfo.status} />
        <Text>{issueInfo.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <Text>
          <ReactMarkdown>{issueInfo?.description}</ReactMarkdown>
        </Text>
      </Card>
    </>
  );
};

export default IssueDetails;
