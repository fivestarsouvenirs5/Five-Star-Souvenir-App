"use client";

import { Popover, PopoverTrigger, PopoverContent, PopoverHeader } from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import OrderButton from '../orderButton'
import Image from "next/image";

import { useMyUser } from "../../context/userContext";

function CartEntry({ entry }) {
    return (
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex flex-row gap-2">
            <Image className="rounded-md border border-text-light" width={80} height={80} src={entry.product_data.image_url} alt="Product Image" />
            <span>
              <p className="text-lg font-medium text-text-dark px-3">{entry.name} {entry.product_data.size ? `~ ${entry.product_data.size}` : ''}</p>
              <p className="text-md text-text py-3">{entry.quantity} x {entry.formattedPrice}</p>
            </span>
          </div>
          <hr></hr>
        </div>
      
    )
  }

export default function CartPopover() {
  const { myUser, isSignedIn } = useMyUser();

  const [open, setOpen] = useState(false);
   const cart = useShoppingCart()

  if (
    !isSignedIn ||
    myUser?.user_metadata?.adminapproval !== "true"
  ) {
    return null;
  }
         const { removeItem, cartDetails, clearCart, formattedTotalPrice } = cart  

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
        align="center"
        className="w-80 p-6 bg-neutral-beige-light shadow-lg border"
      >
         <h2 className="text-xl font-bold text-secondary pb-2 text-center">Your Cart</h2>
         <hr className="pb-2"></hr>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {Object.values(cartDetails || {}).length === 0 ? (
                <p className="text-sm text-center text-text">Cart is empty.</p>
              ) : (
                Object.values(cartDetails || {}).map((entry) => (
                  <CartEntry key={entry.id} entry={entry} />
                ))
              )}
              </div>
                    <div className="pb-3">
                      <div className="justify-end flex pb-4 gap-2 lg:pt-5 pt-5">
                        <p className="text-lg leading-normal text-text-dark">Total: </p>
                        <h3 className="text-lg font-bold leading-normal text-right text-text-dark">{formattedTotalPrice}</h3>
                      </div>
  
                        <OrderButton closeCart={setOpen} page={null}/>
                        
                    </div>
                    <a href="/cart" className="text-lg text-primary hover:underline ">
                          Manage Cart
                      </a>
      </PopoverContent>
    </Popover>
  );
}