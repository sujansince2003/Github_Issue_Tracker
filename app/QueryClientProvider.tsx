"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClient,
} from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <ReactQueryClient client={queryClient}>{children}</ReactQueryClient>;
};
export default QueryClientProvider;

//we create this wrapper because react query use react context to share queryclient with our other components passed as children and context is only availale  client component
