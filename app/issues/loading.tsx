import { Table } from "@radix-ui/themes";
import { Loadingskeleton } from "@/app/components";
import IssuesActions from "./IssuesActions";

const LoadingIssueComp = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <>
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
            <Table.Row key={issue}>
              <Table.Cell>
                <Loadingskeleton />
                <div className="block md:hidden ">
                  <br />
                  <span className="bg-blue-400 px-2 rounded-md text-white font-bold">
                    <Loadingskeleton />
                  </span>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Loadingskeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Loadingskeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingIssueComp;
