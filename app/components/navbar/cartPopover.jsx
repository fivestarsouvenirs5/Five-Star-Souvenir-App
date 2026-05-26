"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { useMyUser } from "../../context/userContext";

export default function CartPopover() {
  const { myUser, isSignedIn } = useMyUser();

  const [open, setOpen] = useState(false);

  if (
    !isSignedIn ||
    myUser?.user_metadata?.adminapproval !== "true"
  ) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="p-2 inline-flex items-center justify-center text-neutral-beige-light"
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-xl"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-72 p-6 bg-neutral-beige-light"
      >
        Cart Content
      </PopoverContent>
    </Popover>
  );
}