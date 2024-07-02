import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Link } from "./components";

interface Props {
  openNum: number;
  closedNum: number;
  inProgressNum: number;
}

const IssueSummary = ({ openNum, closedNum, inProgressNum }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "open",
      value: openNum,
      status: "OPEN",
    },
    {
      label: "closed",
      value: closedNum,
      status: "CLOSED",
    },
    {
      label: "inProgress",
      value: inProgressNum,
      status: "IN_PROGRESS",
    },
  ];
  return (
    <Flex gap={"4"}>
      {statuses?.map((status) => (
        <Card key={status.label}>
          <Flex direction={"column"}>
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${status.status}`}
            >
              {status.label}
            </Link>
            <Text size={"5"} className="font-bold">
              {status.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
