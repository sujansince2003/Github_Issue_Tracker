import prisma from "@/prisma/PrismaClient";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "../components";

import IssuesActions from "./IssuesActions";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "CLOSED" | "IN_PROGRESS"; // Assuming 'OPEN' is a possible value for status
  createdAt: Date;
  updatedAt: Date;
}

const Issue = async () => {
  const issues = await prisma.issue.findMany();

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
          {issues.map((issue) => (
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
                {issue.createdAt.toDateString()}
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
