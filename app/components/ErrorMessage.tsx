import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";
// using PropsWithChildren we dont have to define Ts interface explicilty to children props
const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
