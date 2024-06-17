import prisma from "@/prisma/PrismaClient";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: { id: string };
}

const EditPage = async ({ params }: Props) => {
  const issuedataToEdit = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issuedataToEdit) notFound();
  return <IssueForm issuedataToEdit={issuedataToEdit} />;
};

export default EditPage;
