'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';

const Selector = ( {product} ) => {
  if (product.clothing_size_id == 1) {
      return (
          <div>
              <label id='selector'>Please Select a Size:</label>
              <select >
                  <option value=''> </option>
                  <option value="XS">X-Small</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">X-Large</option>
                  <option value="2XL">2X-Large</option>
              </select>
              <br></br>
          </div>
          
      )
  }
  else {
      return (
          <br></br>
      )
  }
}

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

const Price = ( { product } ) => {
  // if authenticated user
  console.log(product.price)
  return (
    
    <p>Price: {formatCurrencyString({ value: product.price, currency: 'USD' })}</p>
  )
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

// const fetchImages = async ( { image_id} ) => {
//   const body = image_id;
//   console.log(body);
//   const images = await fetch('/api/images', {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify(body),
//   }
//   )
//   console.log(images);
// }


// need to style
const ProductDisplay = ({ product, category, subcategory, addItem}) => {
   const [openModal, setOpenModal] = useState(false);
  //  var size = document.getElementById('selector').value
  var cartDisplayProduct ={
    name: category.category + ' ' + product.product_name,
    id: category.category + '_' + product.product_name,
    price: product.price,
    currency: 'USD',
    // image: image,
    // product_data:{
    //   size: size
    // }
  }

  return (
     
     <>
      <Button onClick={() => setOpenModal(true)}>{product.product_name}</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Product Info:</Modal.Header>
        <Modal.Body>
            <div className = "flex justify-between">              
              <div>
                <img class="w-60"
                src={`/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(product.product_name)}.jpg`} 
                alt="My Image1"
                />
              </div>
``
              <div>
                <h2>Product Name: {product.product_name}</h2>
                <Price product = {product}/>
                <Category category = {category} subcategory = {subcategory} />
                <Stock product= {product} />
                <form>
                    <Selector product= {product} />
                    <label>Qty: </label>
                    <input type='number' min='1' name='quantity' class='rounded-sm w-[81px] h-7' id='qtyinput' />
                </form>
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            let qty = parseInt(document.getElementById('qtyinput').value)
            if (product.clothing_size_id == 1) {
              let size = document.getElementById('size').value
              addItem(cartDisplayProduct, {count: qty, product_data: {size: size}})
            }
            else {
              addItem(cartDisplayProduct, {count: qty})
            }
            
            setOpenModal(false);
          }}>Add to Cart</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDisplay