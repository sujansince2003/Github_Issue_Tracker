import { Loadingskeleton } from "@/app/components";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl ">
      <form className="space-y-6">
        <Loadingskeleton />
        <Loadingskeleton height={"30rem"} />
        <Loadingskeleton width={"5rem"} />
      </form>
    </div>
  );
};

export default IssueFormSkeleton;
