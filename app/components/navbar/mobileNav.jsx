"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { useState } from "react";
import { useMyUser } from "../../context/userContext";

export default function MobileNav() {
  const { myUser, isSignedIn } = useMyUser();

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="p-2 inline-flex items-center justify-center text-neutral-beige-light"
        >
          <Menu className="w-6 h-6" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-64 p-6 bg-primary-dark border-none"
      >
        <Link
          href="/"
          onClick={handleClose}
          className="block py-2 text-white"
        >
          Home
        </Link>

        <Link
          href="/products/new-york"
          onClick={handleClose}
          className="block py-2 text-white"
        >
          Products
        </Link>

        <Link
          href="/contact"
          onClick={handleClose}
          className="block py-2 text-white"
        >
          Contact
        </Link>

        <Link
          href="/about-us"
          onClick={handleClose}
          className="block py-2 text-white"
        >
          About Us
        </Link>

        {isSignedIn &&
          myUser?.user_metadata?.adminapproval === "true" && (
            <Link
              href="/profile"
              onClick={handleClose}
              className="block py-2 text-white"
            >
              Profile
            </Link>
          )}

        {myUser?.app_metadata?.admin && (
          <Link
            href="/users"
            onClick={handleClose}
            className="block py-2 text-white"
          >
            Users
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
}