"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

interface Props {
  openNum: number;
  closedNum: number;
  inProgressNum: number;
}

const IssueCharts = ({ openNum, closedNum, inProgressNum }: Props) => {
  const data = [
    {
      label: "Open",
      value: openNum,
    },
    {
      label: "Closed",
      value: closedNum,
    },
    {
      label: "In Progress",
      value: inProgressNum,
    },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Bar
            dataKey={"value"}
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueCharts;
