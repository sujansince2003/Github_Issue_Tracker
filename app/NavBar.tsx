// navbar is used in root layout and is not reusable component so it is kept next to root layout in app dir
import Link from "next/link";
import { PiBug } from "react-icons/pi";
import React from "react";

const NavBar = () => {
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
              className="hover:text-green-500 transition-colors"
              href={link.slug}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
