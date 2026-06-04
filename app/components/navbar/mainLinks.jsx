
"use client";

import Link from "next/link";
import { useMyUser } from "../../context/userContext";

export default function MainLinks() {
  const { myUser, isSignedIn } = useMyUser();

  return (
    <nav className="hidden md:flex items-center space-x-1">
      <Link
        href="/"
        className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
      >
        Home
      </Link>

      <Link
        href="/products/new-york"
        className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
      >
        Products
      </Link>

      <Link
        href="/contact"
        className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
      >
        Contact
      </Link>

      <Link
        href="/about-us"
        className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
      >
        About Us
      </Link>

      {myUser?.app_metadata?.admin && (
        <Link
          href="/users"
          className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
        >
          Users
        </Link>
      )}
    </nav>
  );
}