"use client";

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
        <a
          href="/"
          onClick={handleClose}
          className="block py-2 text-white"
        >
          Home
        </a>

        <a
          href="/products/new-york"
          onClick={handleClose}
          className="block py-2 text-white"
        >
          Products
        </a>

        <a
          href="/contact"
          onClick={handleClose}
          className="block py-2 text-white"
        >
          Contact
        </a>

        <a
          href="/about-us"
          onClick={handleClose}
          className="block py-2 text-white"
        >
          About Us
        </a>

        {myUser?.app_metadata?.admin && (
          <a
            href="/users"
            onClick={handleClose}
            className="block py-2 text-white"
          >
            Users
          </a>
        )}
      </PopoverContent>
    </Popover>
  );
}