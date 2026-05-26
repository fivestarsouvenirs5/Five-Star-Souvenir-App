"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({
  children,
  initialUser,
  initialMetadata,
  initialSignedIn,
}) {
  const [auth0User] = useState(initialUser);
  const [myUser] = useState(initialMetadata);
  const [isSignedIn] = useState(initialSignedIn);

  return (
    <UserContext.Provider
      value={{
        auth0User,
        myUser,
        isSignedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useMyUser() {
  return useContext(UserContext);
}