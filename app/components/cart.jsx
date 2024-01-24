'use client'
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';

function CartEntry({ entry, removeItem }) {
    return (
      <div>
        <h3></h3>
        {/* {entry.image ? (
          <img width={100} src={entry.image} alt={entry.description} />
        ) : null} */}
        <p>
           {entry.quantity} x {' '}
          "{entry.name}" ={' '}
          {entry.formattedValue}
        </p>
        <button onClick={() => removeItem(entry.id)}>Remove</button>
      </div>
    )
  }

function TotalPrice({total}){
  return (
    <div class="flex items-center pb-6 justify-between lg:pt-5 pt-20">
            <p class="text-2xl leading-normal text-gray-800 dark:text-black">Total</p>
            <h3 class="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-black">{total}</h3>
            </div>
  )
}

export default function Cart() {
    const cart = useShoppingCart()
    const { removeItem, cartDetails, clearCart, formattedTotalPrice } = cart  

    const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
        <CartEntry key={entry.id} entry={entry} removeItem={removeItem} />
      ))

    console.log(cartEntries)
    
    return(
        <div class="lg:w-96 md:w-8/12 w-full bg-red-100 float-right h-full">
        <div class="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto border-2 border-black rounded-md">
        <div>
            <p class="lg:text-4xl text-3xl font-bold leading-9 text-gray-800 dark:text-black">Summary</p>
            <p class="lg:text-1xl text-1xl font-black leading-9 text-gray-800 dark:text-black">Items in Cart:</p>
        </div>
        {cartEntries.length === 0 ? <p>Cart is empty.</p> : null}
        {cartEntries.length > 0 ? (
            <>
            <button onClick={() => clearCart()}>Clear cart</button>
            {cartEntries}
            </>
        ) : null}
        <div>
            <div class="flex items-center justify-between pt-16">
            </div>
            <TotalPrice total={formattedTotalPrice}/>
            <div class = "flex items-center justify-center text-base leading-none w-full py-5 bg-blue-300 border-4 border-black border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white hover:bg-blue-100">
                <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
                </svg>
                <button class="text-black">Order</button>
            </div>
            
        </div>
        </div>
        </div>
    )
}