'use client'
import React from 'react'
import CategoryNJ from './categorynj'
import CategoryNY from './categoryny'
import ProductDisplay from './productdisplay'
import SubCategoryNY from './subcategoryny'
import Cart from './cart'
import { useShoppingCart } from 'use-shopping-cart';


const ProductPageMapping = ({ products, categoryList, subcategoryList, isNY, category, subcategory }) => {

  const cart = useShoppingCart();
  const { addItem } = cart;

  if (categoryList !== null) {
    if (isNY == true) {
      return (
        <div className = "flex justify-between gap-10">

                <div className="grid grid-cols-6 gap-5">
                    {categoryList.map((category) => (
                        <div className="border rounded-md flex items-center justify-center text-center text-xl bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                            <CategoryNY category = {category} />
                        </div>
                    ))}
                </div>
                {/* <div class="border-8 border-sky-500 float-right h-96"></div> */}
                <Cart />

        </div>
      )
    }
    // is NJ
    else{
      return (
        <div className = "flex justify-between gap-10">

          
                <div className="grid grid-cols-6 gap-5">
                    {categoryList.map((category) => (
                        <div className="border rounded-md flex items-center justify-center text-center text-xl bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                            <CategoryNJ category = {category} />
                        </div>
                    ))}
                </div>
                {/* <div class="border-8 border-sky-500 float-right h-96"></div> */}
                <Cart />

        </div>
      )
    }
  }
  else if (subcategoryList !== null) {
    return (
        <div className = "flex justify-between gap-10">

            <div className="grid grid-cols-6 gap-5">
                  {subcategoryList.map((subcategory) => (
                      <div className="border p-5 rounded-md items-center justify-center text-center text-xl font-bold bg-blue-100 hover:bg-blue-300" key={subcategory.subcategory_id} >
                          <SubCategoryNY subcategory = {subcategory} />
                      </div>
                  ))}
            </div>
            <Cart />
        </div>
        
      
    )
  }
  else if (subcategory === null) {
    return (
      <div className = "flex justify-between gap-10">

        <div className="grid grid-cols-6 gap-5">
          {products.map((product) => (
                  <div className="h-1/2" key={product.product_id} >
                    <div className = "bg-white-600 rounded-2xl pl-2 pr-2 pt-2">
                      <div className="flex items-center justify-center pb-4 text-[25px]">
                        <ProductDisplay product = {product} category = {category} subcategory={null} addItem={addItem}/>
                      </div>
                      
                    </div>
                    
                  </div>
              ))}
          </div>
          <Cart /> 
      </div>

    )
  }
  else {
    return (
      <div className = "flex justify-between gap-10">

          <div className="grid grid-cols-6 gap-5">
            {products.map((product) => (
                    <div className="h-1/2" key={product.product_id}>
                      <div className = "bg-white-600 rounded-2xl pl-2 pr-2 pt-2">

                      <div className="flex items-center justify-center pb-4">
                        <ProductDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem}/>
                      </div>
                      
                    </div>
                    </div>
                ))}
          </div>
          <Cart /> 

        </div>
            
      )
  }
}

export default ProductPageMapping