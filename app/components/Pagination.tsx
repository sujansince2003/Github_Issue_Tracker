import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface props {
  itemCount: number; //total data items
  pageSize: number; //total items to show in page

  currentPage: number; //current page number
}

const Pagination = ({ itemCount, pageSize, currentPage }: props) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;
  return (
    <Flex align="center" gap="3">
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <Text>First Page</Text>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <Text>Previous Page</Text>
        <ChevronLeftIcon />
      </Button>

      <Text size={"2"}>
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <Text>Next Page</Text>
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <Text>Last Page</Text>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
