"use client"
import React, { useState, useEffect } from "react";
import { useMyUser } from "../../context/userContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const StoreDisplay = ({
  myStores,
  selectedStore,
  setSelectedStore,
}) => {
  return (
    <div className="flex items-start gap-4 mt-2">
      <div>
        <h2 className="font-bold text-lg">
          {selectedStore?.store_name}
        </h2>

        <p>{selectedStore?.store_street}</p>

        <p>
          {selectedStore?.store_city},{" "}
          {selectedStore?.store_state}{" "}
          {selectedStore?.store_zip}
        </p>
      </div>

      {myStores.length > 1 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-md">
              <FontAwesomeIcon
                icon={faChevronDown}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-neutral-beige-light p-2">
            {myStores.map((store) => (
              <DropdownMenuItem
                key={store.store_id}
                onClick={() => {
                  setSelectedStore(store);
                }}
                className="hover:bg-neutral-beige-dark rounded w-full h-full p-1 cursor-pointer"
              >
                {store.store_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default function Hero() {

  const {
    myUser,
    isSignedIn,
    myStores,
    selectedStore,
    setSelectedStore,
  } = useMyUser();

    if (isSignedIn) {
      return (
           <div className="relative w-full min-h-[200px] md:min-h-[300px] flex items-center">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-brightness-60"
                style={{ backgroundImage: "url('/images/hero-logo.jpg')" }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-sky-900/10" />
              
              <div className="relative flex flex-col w-full pl-4 text-neutral-beige-light ">
                    <h1 className="text-[32px] font-bold flex">
                      Hello, {myUser?.name} {myUser?.given_name}!
                    </h1>
                    <StoreDisplay
                      myStores={myStores}
                      selectedStore={selectedStore}
                      setSelectedStore={setSelectedStore}
                    />

              </div>
      
              
            </div>
      )
    }
    else {
      return (
        <div className="relative w-full min-h-[500px] md:min-h-[650px] flex items-start">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-brightness-60"
                style={{ backgroundImage: "url('/images/hero-logo.jpg')" }}
              />

              {/* Overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-sky-900/10" /> */}

               <div className="relative flex items-center justify-center w-full text-neutral-beige-light pt-[25px] p-2">
                    <h1 className="text-[32px] font-bold">
                      Welcome to Five Star Souvenirs Inc.
                    </h1>

              </div>

              
            </div>
      )
    }
}