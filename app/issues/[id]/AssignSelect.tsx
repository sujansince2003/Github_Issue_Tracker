import { Select } from "@radix-ui/themes";
import React from "react";

const AssignSelect = () => {
  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assign Issue" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="1">Sujan</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssignSelect;
