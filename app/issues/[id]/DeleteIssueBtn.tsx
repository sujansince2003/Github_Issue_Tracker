"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueBtn = ({ issueId }: { issueId: string }) => {
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <TrashIcon />
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure to delete this issue?
          </AlertDialog.Description>
          <Flex gap={"3"} mt={"3"} justify={"end"}>
            <AlertDialog.Cancel>
              <Button variant="soft">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                onClick={async () => {
                  try {
                    await axios.delete("/api/issues/" + issueId);
                    router.push("/issues");
                    router.refresh();
                  } catch (error) {
                    setError(true);
                  }
                }}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Something went wrong</AlertDialog.Title>
          <AlertDialog.Description>
            Fail to delete the Issue,Try again
          </AlertDialog.Description>
          <Flex justify={"end"}>
            <Button onClick={() => setError(false)}>Ok</Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueBtn;
