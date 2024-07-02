// this component is build to have feature of Link from radix for styling and Link from Next for navigation
import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link = ({ href, children, className }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink className={className}>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
