"use client";

import { useQuery } from "@tanstack/react-query";
import IssuesActions from "./IssuesActions";
import axios from "axios";
import { Status } from "@prisma/client";
import { Suspense, useEffect } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
import IssueTable from "./_components/IssueTable";
import { Metadata } from "next";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "CLOSED" | "IN_PROGRESS"; // Assuming 'OPEN' is a possible value for status
  createdAt: Date;
  updatedAt: Date;
}

const Issue = ({
  searchParams,
}: {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sortBy: "desc" | "asc";
    page: string; //page represent pagenumber which should be number but we are using string because we are getting from URL.we will manually convert it to number
  };
}) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "createdAt",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const statusQuery = searchParams.status ?? "All";
  const sortBy = searchParams.sortBy;
  const orderBy = columns
    ?.map((col) => col.value)
    .includes(searchParams.orderBy)
    ? searchParams.orderBy
    : undefined;

  const page = parseInt(searchParams?.page) || 1;
  const pageSize = 10; //todo:::: implement feature of dropdown to select by user

  const { data, error, refetch } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/issues${statusQuery ? `?status=${statusQuery}` : ""}${
          orderBy ? `&orderBy=${orderBy}` : ""
        }${sortBy ? `&sortBy=${sortBy}` : ""}${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }`
      );
      return response.data;
    },
  });

  const itemCount = data?.totalIssuesCount;

  useEffect(() => {
    refetch();
  }, [statusQuery, orderBy, sortBy, page, pageSize, refetch]);
  if (error) {
    console.error(error); // Log error for debugging
    return <div>Error loading issues. Please try again later.</div>;
  }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <IssuesActions />
        <IssueTable
          Issues={data?.Issues}
          columns={columns}
          searchParams={searchParams}
        />
        <Pagination
          pageSize={pageSize}
          itemCount={itemCount}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
};

export const dynamic = "force-dynamic"; //for dynamic rendering this page in build

export default Issue;
