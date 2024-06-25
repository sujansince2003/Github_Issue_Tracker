import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";

interface Props {
  columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[];
  Issues: Issue[];
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sortBy: "desc" | "asc";
    page: string; //page represent pagenumber which should be number but we are using string because we are getting from URL.we will manually convert it to number
  };
}

const IssueTable = ({ columns, searchParams, Issues }: Props) => {
  const sortBy = searchParams.sortBy;
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns?.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    sortBy: sortBy === "asc" ? "desc" : "asc",
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon
                  className={`inline ${sortBy === "asc" ? "" : "rotate-180"}`}
                />
              )}
            </Table.ColumnHeaderCell>
          ))}

          {/* <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="hidden md:table-cell">
          Status
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="hidden md:table-cell">
          Created
        </Table.ColumnHeaderCell> */}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Issues?.map((issue: Issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

              <div className="block md:hidden ">
                <br />
                <span className="bg-blue-400 px-2 rounded-md text-white font-bold">
                  <IssueStatusBadge status={issue.status} />
                </span>
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {new Date(issue.createdAt).toDateString()}
              {/* Since createdAt is defined as a Date object in the Issue interface, but when data is fetched from an API, it often comes as a string. Thus, you need to convert the string to a Date object before calling toDateString(). */}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
