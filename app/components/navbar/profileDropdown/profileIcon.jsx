"use client";
import { useState } from "react";
import { useMyUser } from "../../../context/userContext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  faPen,
  faStore,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditProfileModal from "./editProfile";
import EditStoresModal from "./editStores";

export default function ProfileIcon() {
  const {  myUser,  setMyUser } = useMyUser();

  const [openProfileModal, setOpenProfileModal] = useState(false);

   const [openStoreModal, setOpenStoreModal] = useState(false);

   const [formData, setFormData] = useState({
        user_id: myUser?.user_id,
        firstName: myUser?.name || "",
        lastName: myUser?.given_name || "",
        email: myUser?.email || "",
        phone: myUser?.user_metadata.phonenumber || "",
        photo: myUser?.picture || "",
        photoFile: null,
    });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar className="w-15 h-10 cursor-pointer">
            <AvatarImage src={formData.photo} className="object-cover" />
            <AvatarFallback>
                {myUser?.given_name?.charAt(0)}
                {myUser?.family_name?.charAt(0)}
            </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 bg-neutral-beige-light text-text-dark">
                
                <DropdownMenuItem onClick={() => setOpenProfileModal(true)} className="flex cursor-pointer gap-2 hover:bg-neutral-beige-dark w-full h-full rounded p-1 items-center">
                <FontAwesomeIcon icon={faPen} /> Edit Profile
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setOpenStoreModal(true)} className="flex cursor-pointer gap-2 hover:bg-neutral-beige-dark w-full h-full rounded p-1 items-center">
                    <FontAwesomeIcon icon={faStore} /> Edit Stores
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                <a href="/api/auth/logout" className="flex gap-2 hover:bg-neutral-beige-dark w-full h-full rounded p-1 items-center cursor-pointer">
                    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </a>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

      {/* edit profile popup */}
        <EditStoresModal openModal={openStoreModal} setOpenModal={setOpenStoreModal} />
      <EditProfileModal openModal={openProfileModal} setOpenModal={setOpenProfileModal} formData={formData} setFormData={setFormData}/>

    
    </>
  );
}