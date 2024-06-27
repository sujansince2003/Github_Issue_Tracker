import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }; //page represent pagenumber which should be number but we are using string because we are getting from URL.we will manually convert it to number
}) {
  return (
    <>
      <LatestIssues />
      {/* <Pagination
        itemCount={50}
        pageSize={5}
        currentPage={parseInt(searchParams.page)}
      /> */}
    </>
  );
}
