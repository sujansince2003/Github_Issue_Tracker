import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href={"/issues/newissue"} className="font-bold">
          Create Issue
        </Link>
      </Button>
    </div>
  );
};

export default IssuesActions;
