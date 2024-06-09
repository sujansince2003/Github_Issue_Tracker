"use client";
import { TextField, TextArea, Button } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const AddnewIssue = () => {
  return (
    <div className="max-w-xl  space-y-6">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description of Issue" />
      <SimpleMDE />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default AddnewIssue;
