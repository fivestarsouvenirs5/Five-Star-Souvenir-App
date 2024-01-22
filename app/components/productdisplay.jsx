'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

const Selector = ( {product} ) => {
  if (product.clothing_size_id == 1) {
      return (
          <div>
              <label>Please Select a Size:</label>
              <select >
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
    
    <p>${product.price}</p>
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

const fetchImages = async ( { image_id} ) => {
  const body = image_id;
  console.log(body);
  const images = await fetch('/api/images', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }
  )
  console.log(images);
}


// need to style
const ProductDisplay = ({ product, category, subcategory, list, setList, imageBlobURL}) => {
   const [openModal, setOpenModal] = useState(false);
   function increase() {
    const qtyField = document.getElementById('qtyinput');
    let num = qtyField.value;
    num++;
    qtyField.value = num;
 }

 function decrease() {
    const qtyField = document.getElementById('qtyinput');
    let num = qtyField.value;
    num--;
    if (num < 0) {
      num = 0;
    }
    qtyField.value = num;
 }
//  function AddToCart(){
//   var qty = document.getElementById('qtyinput').value
//   if (product.clothing_size_id == 1) {
//     // var size = document.getElementById('size').value
//     // var newListItem = {category.category}
//   }
//   setOpenModal(false);
//  }

fetchImages(product.image_id);

  return (
     
     <>
      <Button onClick={() => setOpenModal(true)}>{product.product_name}</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Product Info:</Modal.Header>
        <Modal.Body>
            {/*when image table is done call it to get it working */}
            <div className = "flex justify-between gap-5">
              <img src={imageBlobURL} alt="My Image" />
              <Price product = {product}/>
              <div>
                <h2>Product Name: {product.product_name}</h2>
                <Category category = {category} subcategory = {subcategory} />
                {/* will be what is under this but need to make column first*/}
                <Stock product= {product} />
                <form>
                    <Selector product= {product} />
                    <label>Qty: </label>
                    {/* <input type='button' value='-' id='qtyminus'onClick={decrease} /> */}
                    <input type='number' min='1' name='quantity' class='rounded-sm w-[81px] h-7' id='qtyinput' />
                    {/* <input type='button' value='+' id= 'qtyplus' onClick={increase}/> */}
                </form>
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            let qty = document.getElementById('qtyinput').value
            if (product.clothing_size_id == 1) {
              let size = document.getElementById('size').value
              let newListItem = qty + "x " + size + " " + category.category + " " + product.product_name + " "
              setList([...list, newListItem])
            }
            else {
              let newListItem = qty + "x " + category.category + " " + product.product_name + " "
              setList([...list, newListItem])
            }
            setOpenModal(false);
          }}>Add to Cart</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDisplay