"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

interface props {
  itemCount: number; //total data items
  pageSize: number; //total items to show in page

  currentPage: number; //current page number
}

const Pagination = ({ itemCount, pageSize, currentPage }: props) => {
  const router = useRouter();
  const searchparams = useSearchParams();

  function changePage(page: number) {
    const params = new URLSearchParams(searchparams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  }

  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Flex align="center" gap="3" justify={"center"} mt={"4"}>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <Text>First Page</Text>
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <Text>Previous Page</Text>
          <ChevronLeftIcon />
        </Button>

        <Text size={"2"}>
          Page {currentPage} of {pageCount}
        </Text>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <Text>Next Page</Text>
          <ChevronRightIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <Text>Last Page</Text>
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Suspense>
  );
};

export default Pagination;
