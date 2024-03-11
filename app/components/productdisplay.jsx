'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { formatCurrencyString } from 'use-shopping-cart';
import { useUser } from '@auth0/nextjs-auth0/client';


const Stock = ( {product} ) => {
  if (product.in_stock === "In Stock") {
    return (
      <h2 className ="text-emerald-500">{product.in_stock}</h2>
    )
  }
  else {
    return (
      <h2 className= "text-red-300">{product.in_stock}</h2>
    )
  }
}
  

const Category = ( { subcategory, category }) => {
  if (subcategory == null) {
    return (
      <h2>Category: {category.category} </h2>
    )
  }
  else {
    return (
      <h2>Category: {category.category}, {subcategory.subcategory_name}</h2>
    )
  }
}

const ImgSrc = ( { subcategory, category, product }) => {
    if (subcategory == null) {
      if (category.category_location == 0) {
        return (
          <img className="w-60"
                src={`/images/CATEGORIES/NJ/${encodeURIComponent(product.product_name)}.jpg`} 
                alt="My Image3"
                />
        )
      }
      else {
        return (
        <img className="w-60"
                src={`/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(product.product_name)}.jpg`} 
                alt="My Image1"
                />
        )
      }
      
    }
    else {
      return (
        <img className="w-60"
                src={`/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(subcategory.subcategory_name)}/${encodeURIComponent(product.product_name)}.jpg`} 
                alt="My Image2"
                />
      )
    }
  }

const ProductDisplay = ({ product, category, subcategory, addItem}) => {
  const {user} = useUser();
  const [openModal, setOpenModal] = useState(false);

  if (user) {
      
      //  var size = document.getElementById('selector').value
      var cartDisplayProduct
      if (subcategory !== null){
        cartDisplayProduct ={
          name: subcategory.subcategory_name + ' ' + product.product_name,
          id: subcategory.subcategory_name + '_' + product.product_name,
          price: product.price,
          currency: 'USD',
          // image: image,
          // product_data:{
          //   location: category.category_location
          // }
        }
      }
      else {
        cartDisplayProduct ={
          name: category.category + ' ' + product.product_name,
          id: category.category + '_' + product.product_name,
          price: product.price,
          currency: 'USD',
          // image: image,
          // product_data:{
          //   location: category.category_location
          // }
        }
      }
      
      return (
        <>
          <div className="border-2 bg-red-100 flex flex-col items-center">
            <button className="border-b-2" onClick={() => setOpenModal(true)}> 
              <ImgSrc category = {category} subcategory={subcategory} product = {product} />
            </button>
            <label className="flex justify items-center">
              {product.product_name}
            </label>
            {formatCurrencyString({ value: product.price, currency: 'USD' })}
        </div>
          

          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Product Info:</Modal.Header>
            <Modal.Body>
                <div className = "flex justify-between">              
                  <div>
                  <ImgSrc category = {category} subcategory={subcategory} product = {product} />
                  </div>
                  <div>
                    <h2>Product Name: {product.product_name}</h2>
                    <p>Price: {formatCurrencyString({ value: product.price, currency: 'USD' })}</p>
                    <Category category = {category} subcategory = {subcategory} />
                    <Stock product= {product} />
                    <form>
                        <label>Qty: </label>
                        <input type='number' min='1' placeholder='1' name='quantity' class='rounded-sm w-[81px] h-7' id='qtyinput' />
                    </form>
                  </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => {
                let qty = parseInt(document.getElementById('qtyinput').value)
                  addItem(cartDisplayProduct, {count: qty, product_metadata: {location: category.category_location, cell: product.order_form_cell}})
                
                
                setOpenModal(false);
              }}>Add to Cart</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
  }
  else {
      return (
        <>
          <div className="border-2 bg-red-100 flex flex-col items-center">
              <ImgSrc category = {category} subcategory={subcategory} product = {product} />
            <label className="flex justify items-center">
              {product.product_name}
            </label>
          </div>
          
        </>
      );
  }
  
}

export default ProductDisplay