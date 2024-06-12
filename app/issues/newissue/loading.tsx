import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssue = async () => {
  return (
    <div className="max-w-xl ">
      <form className="space-y-6">
        <Skeleton />
        <Skeleton height={"30rem"} />
        <Skeleton width={"5rem"} />
      </form>
    </div>
  );
};

export default LoadingNewIssue;
