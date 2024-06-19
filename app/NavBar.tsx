// navbar is used in root layout and is not reusable component so it is kept next to root layout in app dir
//client side rendering as we are using browser API i.e usePathname()
"use client";
import Link from "next/link";
import { PiBug } from "react-icons/pi";
import React from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPathname = usePathname();
  const { status, data: session } = useSession();
  const navLinks = [
    { name: "Dashboard", label: "Dashboard", slug: "/" },
    { name: "Issues", label: "Issues", slug: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 mb-7 border-b px-24 h-12 items-center justify-between text-lg">
      <Link href={"/"}>
        <PiBug className="text-2xl hover:text-green-500" />
      </Link>
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
      <Box>
        {status === "authenticated" && (
          <Link href={"/api/auth/signout"}>Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Sign In</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
