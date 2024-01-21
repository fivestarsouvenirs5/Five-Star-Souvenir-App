
'use client'
import React from 'react'
import CategoryNJ from './categorynj'
import CategoryNY from './categoryny'
import ProductDisplay from './productdisplay'
import SubCategoryNY from './subcategoryny'
import Cart from './cart'
import {useState} from "react";


const ProductPageMapping = ({ products, categoryList, subcategoryList, isNY, category, subcategory }) => {
  const [listInCart, setListInCart] = useState(["test"])

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
                <Cart list = {listInCart} setList = {setListInCart}/>

        </div>
      )
    }
    else{
      return (
        <div className = "flex justify-between gap-10">

                <div className="grid grid-cols-6 gap-5 h-1/6">
                    {categoryList.map((category) => (
                        <div className="border rounded-md flex items-center justify-center w-full text-center text-xl bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                            <CategoryNJ category = {category} />
                        </div>
                    ))}
                </div>
                {/* <div class="border-8 border-sky-500 float-right h-96"></div> */}
                <Cart list = {listInCart} setList = {setListInCart}/>

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
            <Cart list = {listInCart} setList = {setListInCart}/>
        </div>
        
      
    )
  }
  else if (subcategory === null) {
    return (
      <div className = "flex justify-between gap-10">

        <div className="grid grid-cols-6 gap-5">
          {products.map((product) => (
                  <div className="h-1/2" key={product.product_id} >
                      <ProductDisplay product = {product} category = {category} subcategory={null} list = {listInCart} setList = {setListInCart}/>
                  </div>
              ))}
          </div>
          <Cart list = {listInCart} setList = {setListInCart}/> 
      </div>

    )
  }
  else {
    return (
      <div className = "flex justify-between gap-10">

          <div className="grid grid-cols-6 gap-5">
            {products.map((product) => (
                    <div className="h-1/2" key={product.product_id}>
                        <ProductDisplay product = {product} category = {category} subcategory = {subcategory} list = {listInCart} setList ={setListInCart}/>
                    </div>
                ))}
          </div>
          <Cart list = {listInCart} setList ={setListInCart}/> 

        </div>
            
      )
  }
}

export default ProductPageMapping