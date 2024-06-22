import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusFilter from "./StatusFilter";

const IssuesActions = () => {
  return (
    <Flex mb={"5"} justify={"between"}>
      <Button>
        <Link href={"/issues/newissue"} className="font-bold">
          Create Issue
        </Link>
      </Button>
      <StatusFilter />
    </Flex>
  );
};

export default IssuesActions;
