"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider> {children} </SessionProvider>;
};

export default AuthProvider;
