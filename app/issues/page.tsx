import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const Issue = () => {
  return (
    <div>
      <Button>
        <Link href={"/issues/newissue"}>Create Issue</Link>
      </Button>
    </div>
  );
};

export default Issue;
