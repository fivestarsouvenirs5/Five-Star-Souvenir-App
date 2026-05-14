"use client"
import { getSession } from '@auth0/nextjs-auth0';
import React, { useState, useEffect } from 'react';
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

async function fetchStores(id) {
    const response = await fetch(`/api/getMyStores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    });

    if (!response.ok) {
        console.error("Failed to fetch stores");
        return [];
    }
    const stores = await response.json();

    return stores;
}


const StoreDisplay = ({ myStores }) => {
  const [selectedStoreId, setSelectedStoreId] = useState( "" );

  const [selectedStore, setSelectedStore] = useState({});

  useEffect(() => {
    if (myStores.length > 0) {
        setSelectedStoreId(myStores[0].store_id.toString());
        setSelectedStore(myStores[0]);
    }
  }, [myStores]);


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
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-neutral-beige-light p-2">
            {myStores.map((store) => (
                <DropdownMenuItem
                key={store.store_id}
                onClick={() => {
                    setSelectedStoreId(
                    store.store_id.toString()
                    );

                    setSelectedStore(store);
                }}
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

    const { user} = useUser();

  const [myStores, setMyStores] = useState([]);

  useEffect(() => {
    async function loadStores() {
      if (!user?.sub) {
        return;
      }

      const stores = await fetchStores( user.sub);

      setMyStores(stores);
    }

    loadStores();
  }, [user]);

    if (user) {
      return (
           <div className="relative w-full min-h-[200px] md:min-h-[300px] flex items-center">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-brightness-60"
                style={{ backgroundImage: "url('/images/hero-logo.jpg')" }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-sky-900/10" />
              
              <div className="relative flex flex-col w-full pl-4 text-neutral-beige-light ">
                    <h1 className="text-[32px] font-bold flex">
                      Hello, {user.name} {user.given_name}!
                    </h1>
                    <StoreDisplay myStores={myStores} />

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

               <div className="relative flex items-center justify-center w-full text-neutral-beige-light pt-[25px]">
                    <h1 className="text-[32px] font-bold">
                      Welcome to Five Star Souvenirs Inc.
                    </h1>

              </div>

              
            </div>
      )
    }
}