import { Loadingskeleton } from "@/app/components";

const LoadingNewIssue = async () => {
  return (
    <div className="max-w-xl ">
      <form className="space-y-6">
        <Loadingskeleton />
        <Loadingskeleton height={"30rem"} />
        <Loadingskeleton width={"5rem"} />
      </form>
    </div>
  );
};

export default LoadingNewIssue;
