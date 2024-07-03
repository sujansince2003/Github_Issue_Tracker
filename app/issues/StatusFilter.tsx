"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchparams = useSearchParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Select.Root
        defaultValue={searchparams.get("status")! || "All"}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status) {
            params.append("status", status);
          }
          if (searchparams.get("orderBy")) {
            params.append("orderBy", searchparams.get("orderBy")!);
          }
          if (searchparams.get("sortBy")) {
            params.append("sortBy", searchparams.get("sortBy")!);
          }
          const query = params.size ? "?" + params.toString() : "";
          router.push("/issues" + query);
        }}
      >
        <Select.Trigger placeholder="filter by status" />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value ?? "All"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Suspense>
  );
};

export default StatusFilter;
