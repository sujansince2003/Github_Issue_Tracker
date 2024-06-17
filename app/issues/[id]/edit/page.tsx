import prisma from "@/prisma/PrismaClient";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

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
