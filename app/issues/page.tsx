"use client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "../components";
import { useQuery } from "@tanstack/react-query";
import IssuesActions from "./IssuesActions";
import axios from "axios";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "CLOSED" | "IN_PROGRESS"; // Assuming 'OPEN' is a possible value for status
  createdAt: Date;
  updatedAt: Date;
}

const Issue = () => {
  const { data: issues, error } = useQuery<Issue[]>({
    queryKey: ["issues"],
    queryFn: async () => {
      const response = await axios.get("/api/issues");
      return response.data;
    },
    retry: 2,
  });
  if (error) {
    console.error(error); // Log error for debugging
    return <div>Error loading issues. Please try again later.</div>;
  }
  return (
    <div>
      <IssuesActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues?.map((issue: Issue) => (
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
    </div>
  );
};

export const dynamic = "force-dynamic"; //for dynamic rendering this page in build

export default Issue;
