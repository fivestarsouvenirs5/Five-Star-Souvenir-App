'use client'
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import OrderButton from './orderButton'
import {useState} from 'react'
import {useEffect} from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';


function CartEntry({ entry, removeItem }) {
 
  // console.log(entry.product_data.location)
    return (
      <div>
        <h3></h3>
        {/* {entry.image ? (
          <img width={100} src={entry.image} alt={entry.description} />
        ) : null} */}
        <p>
           {entry.quantity} x {' '}
           &quot;{entry.name}&quot; ={' '}
          {entry.formattedValue}
        </p>
        <button onClick={() => removeItem(entry.id)}>Remove</button>
      </div>
    )
  }

export default function Cart() {
    // console.log(cartEntries)
    const { user} = useUser();
    const cart = useShoppingCart()
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
      // This forces a rerender, so the date is rendered
      // the second time but not the first
      setHydrated(true);
    }, []);
    if (!hydrated) {
      // Returns null on first render, so the client and server match
      return null;
    }

    if (user) {
        
        const { removeItem, cartDetails, clearCart, formattedTotalPrice } = cart  
    
        // console.log(cartDetails);
        const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
    
            <CartEntry key={entry.id} entry={entry} removeItem={removeItem} />
          ))
    
          
        
        return(
          <div className="lg:w-96 md:w-8/12 w-full bg-red-100 float-right h-full">
          <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto rounded-md">
          <div>
              <p className="lg:text-4xl text-3xl font-bold leading-9 text-gray-800 dark:text-black">Summary</p>
              <p className="lg:text-1xl text-1xl font-black leading-9 text-gray-800 dark:text-black">Items in Cart:</p>
          </div>
          {cartEntries.length === 0 ? <p>Cart is empty.</p> : null}
          {cartEntries.length > 0 ? (
              <>
              <button onClick={() => clearCart()}>Clear cart</button>
              {cartEntries}
              </>
          ) : null}
          <div>
              <div className="flex items-center justify-between pt-16">
              </div>
              {/* <TotalPrice total={formattedTotalPrice}/> */}
              <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
              <p className="text-2xl leading-normal text-gray-800 dark:text-black">Total</p>
              <h3 className="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-black" >{formattedTotalPrice}</h3>
            </div>
              <div className = "flex items-center justify-center text-base leading-none w-full py-5 bg-blue-300 border-4 border-black border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white hover:bg-blue-100">
                  <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
                  </svg>
                  <OrderButton />
              </div>
              
          </div>
          </div>
          </div>
      )
    }
    else {
      return <div className="lg:w-96 md:w-8/12 w-full float-right h-full"></div>
    }
    
    
}