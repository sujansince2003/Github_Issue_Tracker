import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const StatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value ?? "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default StatusFilter;
