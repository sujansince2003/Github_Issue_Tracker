// navbar is used in root layout and is not reusable component so it is kept next to root layout in app dir
//client side rendering as we are using browser API i.e usePathname()
"use client";
import Link from "next/link";
import { PiBug } from "react-icons/pi";
import React from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Skeleton from "@/app/components/Skeleton";
import { Avatar, Box, Container, DropdownMenu, Text } from "@radix-ui/themes";

const NavBar = () => {
  return (
    <Container>
      <nav className="flex space-x-2 mb-7 border-b  h-12 justify-between items-center px-3  md:text-lg">
        <Link href={"/"}>
          <PiBug className="text-2xl hover:text-green-500" />
        </Link>
        <NavLinks />
        <AuthStatusNav />
      </nav>
    </Container>
  );
};

const NavLinks = () => {
  const currentPathname = usePathname();

  const navLinks = [
    { name: "Dashboard", label: "Dashboard", slug: "/" },
    { name: "Issues", label: "Issues", slug: "/issues" },
  ];
  return (
    <ul className="flex space-x-8">
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link
            className={classNames({
              "text-red-600": currentPathname === link.slug,
              "hover:text-green-500 transition-colors": true,
            })}
            href={link.slug}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatusNav = () => {
  const { status, data: session } = useSession();
  return (
    <Box>
      {status === "loading" && <Skeleton width={"3rem"} />}
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user?.image!}
              fallback={"?"}
              size={"2"}
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size={"2"}>{session.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href={"/api/auth/signout"}>Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"}>Sign In</Link>
      )}
    </Box>
  );
};

export default NavBar;
