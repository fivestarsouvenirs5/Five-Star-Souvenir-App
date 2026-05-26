"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import OrderButton from '../orderButton'
import Image from "next/image";

import { useMyUser } from "../../context/userContext";
import Link from "next/link";

function CartEntry({ entry }) {
  console.log(entry)
    return (
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex flex-row gap-2">
            <Image className="rounded-md border border-text-light" width={80} height={80} src={entry.product_data.image_url} alt="Product Image" />
            <span>
              <p className="text-lg font-medium text-text-dark px-3">{entry.name}</p>
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

        const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
    
            <CartEntry key={entry.id} entry={entry} removeItem={removeItem} />
          ))


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
        className="w-80 p-6 bg-neutral-beige-light"
      >
            <div className="max-h-96 overflow-y-auto space-y-2">
              {cartEntries.length === 0 ? <p>Cart is empty.</p> : null}
                    {cartEntries.length > 0 ? (
                      <>           
                         {cartEntries}
                      </>
                    ) : null}
              </div>
                    <div className="pb-3">
                      <div className="justify-end flex pb-4 gap-2 lg:pt-5 pt-5">
                        <p className="text-lg leading-normal text-text-dark">Total: </p>
                        <h3 className="text-lg font-bold leading-normal text-right text-text-dark">{formattedTotalPrice}</h3>
                      </div>
  
                        <OrderButton closeCart={setOpen}/>
                        
                    </div>
                    <Link href="/cart" className="text-lg text-primary hover:underline ">
                          View Cart
                      </Link>
      </PopoverContent>
    </Popover>
  );
}