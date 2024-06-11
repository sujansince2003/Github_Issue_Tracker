// this component is build to have feature of Link from radix for styling and Link from Next for navigation
import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
  href: string;
  children: string;
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
