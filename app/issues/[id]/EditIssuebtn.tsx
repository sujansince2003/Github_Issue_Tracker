import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssuebtn = ({ issueId }: { issueId: string }) => {
  return (
    <Link href={`/issues/${issueId}/edit`} className="grid">
      <Button>
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssuebtn;
