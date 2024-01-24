"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export function CartProvider({ children }) {
  return (
    <USCProvider
    cartMode="checkout-session"
    stripe=""
    currency="USD"
    >
      {children}
    </USCProvider>
  );
}
