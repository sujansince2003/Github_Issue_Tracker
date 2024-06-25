import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }; //page represent pagenumber which should be number but we are using string because we are getting from URL.we will manually convert it to number
}) {
  return (
    <>
      <div>hello</div>
      <Pagination
        itemCount={50}
        pageSize={5}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}
