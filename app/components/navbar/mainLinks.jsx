
"use client";

import { useMyUser } from "../../context/userContext";

export default function MainLinks() {
  const { myUser, isSignedIn } = useMyUser();

  return (
    <nav className="hidden md:flex items-center space-x-1">
      <a
        href="/"
        className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
      >
        Home
      </a>

      <a
        href="/products/new-york"
        className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
      >
        Products
      </a>

      <a
        href="/contact"
        className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
      >
        Contact
      </a>

      <a
        href="/about-us"
        className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
      >
        About Us
      </a>

      {myUser?.app_metadata?.admin && (
        <a
          href="/users"
          className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline"
        >
          Users
        </a>
      )}
    </nav>
  );
}