"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const UserContext = createContext();

async function fetchStores(id) {
  const response = await fetch(`/api/getMyStores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    console.error("Failed to fetch stores");
    return [];
  }

  return await response.json();
}

export function UserProvider({
  children,
  initialUser,
  initialSignedIn,
}) {
  const [myUser, setMyUser] =
    useState(initialUser);

  const [isSignedIn] =
    useState(initialSignedIn);

  const [myStores, setMyStores] =
    useState([]);

  const [selectedStore, setSelectedStore] =
    useState(null);

  useEffect(() => {
    async function loadStores() {
      if (!myUser?.user_id) return;

      const stores = await fetchStores(
        myUser.user_id
      );

      setMyStores(stores);

      if (stores.length > 0) {
        setSelectedStore(stores[0]);
      }
    }

    loadStores();
  }, [myUser]);

  return (
    <UserContext.Provider
      value={{
        myUser,
        isSignedIn,
        myStores,
        setMyStores,
        selectedStore,
        setSelectedStore,
        setMyUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useMyUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useMyUser must be used within UserProvider"
    );
  }

  return context;
}