import { TextField, TextArea, Button } from "@radix-ui/themes";
import React from "react";

const AddnewIssue = () => {
  return (
    <div className="max-w-xl  space-y-6">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description of Issue" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default AddnewIssue;
