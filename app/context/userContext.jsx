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
  initialMetadata,
  initialSignedIn,
}) {
  const [auth0User] = useState(initialUser);
  const [myUser] = useState(initialMetadata);
  const [isSignedIn] = useState(initialSignedIn);

  const [myStores, setMyStores] = useState([]);
  const [selectedStore, setSelectedStore] =
    useState(null);

  useEffect(() => {
    async function loadStores() {
      if (!auth0User?.sub) return;

      const stores = await fetchStores(
        auth0User.sub
      );

      setMyStores(stores);

      // default selected store
      if (stores.length > 0) {
        setSelectedStore(stores[0]);
      }
    }

    loadStores();
  }, [auth0User]);

  return (
    <UserContext.Provider
      value={{
        auth0User,
        myUser,
        isSignedIn,

        myStores,
        selectedStore,
        setSelectedStore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useMyUser() {
  return useContext(UserContext);
}