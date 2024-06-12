import { Heading, Flex, Card, Box } from "@radix-ui/themes";
import { Loadingskeleton } from "@/app/components";

const IssueInfoLoading = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Loadingskeleton />
      </Heading>

      <Flex gap={"4"} my={"2"}>
        <Loadingskeleton width={"5rem"} />
        <Loadingskeleton width={"9rem"} />
      </Flex>
      <Card className="prose" mt="4">
        <Loadingskeleton count={4} />
      </Card>
    </Box>
  );
};

export default IssueInfoLoading;
