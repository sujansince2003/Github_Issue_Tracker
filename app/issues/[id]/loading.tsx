import { Heading, Flex, Card, Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueInfoLoading = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>

      <Flex gap={"4"} my={"2"}>
        <Skeleton width={"5rem"} />
        <Skeleton width={"9rem"} />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={4} />
      </Card>
    </Box>
  );
};

export default IssueInfoLoading;
