"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

async function getAppMetadata(email) {
  const axios = (await import("axios")).default;

  const getAccess = {
    method: "POST",
    url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/json" },
    data: {
      grant_type: "client_credentials",
      client_id: process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_SECRET,
      audience: process.env.NEXT_PUBLIC_AUTH0_API_ID,
    },
  };

  const tokenRes = await axios.request(getAccess);

  const options = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users-by-email`,
    params: { email },
    headers: { authorization: `Bearer ${tokenRes.data.access_token}` },
  };

  const userRes = await axios.request(options);

  return userRes.data[0];
}

export default function MobileNav() {
  const { user } = useUser();
  const [myUser, setMyUser] = useState(null);
    const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!user?.email) return;

    const load = async () => {
      const data = await getAppMetadata(user.email);
      setMyUser(data);
    };

    load();
  }, [user]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="p-2 inline-flex items-center justify-center text-neutral-beige-light">
            <Menu className="w-6 h-6" />
        </button>
      </PopoverTrigger>

        <PopoverContent className="w-64 p-6 bg-primary-dark ">
         <Link href="/" onClick={handleClose} className="block py-2 text-white">
          Home
        </Link>

        <Link href="/products/new-york" onClick={handleClose} className="block py-2 text-white">
          Products
        </Link>

        <Link href="/contact" onClick={handleClose} className="block py-2 text-white">
          Contact
        </Link>

        <Link href="/about-us" onClick={handleClose} className="block py-2 text-white">
          About Us
        </Link>

        {myUser?.app_metadata?.adminapproval && (
          <Link href="/profile" onClick={handleClose} className="block py-2 text-white">
            Profile
          </Link>
        )}

        {myUser?.app_metadata?.admin && (
          <Link href="/users" onClick={handleClose} className="block py-2 text-white">
            Users
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
}