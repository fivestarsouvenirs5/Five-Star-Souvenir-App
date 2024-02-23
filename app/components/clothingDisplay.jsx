'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import { useUser } from '@auth0/nextjs-auth0/client';

let selected_size = "";


const Selector = ( {sizeList} ) => {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

    return (
        <div>
            <label >Please Select a Size: </label>
            <select id='selector' onChange={handleSizeChange} value={selectedSize}>
              <option value="" disabled>--</option> {/* not good cuz someone may add to cart with this selected */}
              {sizeList.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
            <br></br>
            {/* <p>Selected Size: {selectedSize}</p> */}
            <label hidden>{selected_size = selectedSize}</label>

        </div>
        
    )
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

const ClothingDisplay = ({ product, category, subcategory, addItem, clothe}) => {
  const {user} = useUser();
  const [openModal, setOpenModal] = useState(false);

  // console.log(clothe, product.product_id)

  var cartDisplayProduct
  if (user) {
      const filteredSizes = clothe.map(item => item.size);
      const filteredPrices = clothe.map(item => item.price);
      // const clothingPrice = filteredPrices[filteredSizes.indexOf(selected_size)];

      //  var size = document.getElementById('selector').value
      
      // if (subcategory !== null){
      //   cartDisplayProduct ={
      //     name: subcategory.subcategory_name + ' ' + product.product_name,
      //     id: subcategory.subcategory_name + '_' + product.product_name,
      //     price: clothingPrice,
      //     currency: 'USD',
      //     // image: image,
      //     // product_data:{
      //     //   location: category.category_location
      //     // }
      //   }
      // }
      // else {
      //   cartDisplayProduct ={
      //     name: category.category + ' ' + product.product_name,
      //     id: category.category + '_' + product.product_name,
      //     price: clothingPrice,
      //     currency: 'USD',
    
      //     // image: image,
      //     // product_data:{
      //     //   location: category.category_location
      //     // }
      //   }
      // }


      return (
        <>
          <div className="border-2 bg-red-100 flex flex-col items-center">
            <button className="border-b-2" onClick={() => setOpenModal(true)}> 
              <ImgSrc category = {category} subcategory={subcategory} product = {product} />
            </button>
            <label className="flex justify items-center">
              {product.product_name}
            </label>
            <p className="text-[16px]">{formatCurrencyString({ value: filteredPrices[0], currency: 'USD' })} to {formatCurrencyString({ value: filteredPrices[filteredPrices.length - 1], currency: 'USD' })}</p>
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
                    <p>Price: {formatCurrencyString({ value: filteredPrices[0], currency: 'USD' })} to {formatCurrencyString({ value: filteredPrices[filteredPrices.length - 1], currency: 'USD' })}
                    </p>
                    <Category category = {category} subcategory = {subcategory} />
                    <Stock product= {product} />
                    <form>
                        <Selector product= {product} sizeList={filteredSizes} />
                        <p>{selected_size}</p>
                        <label>Qty: </label>
                        <input type='number' min='1' name='quantity' className='rounded-sm w-[81px] h-7' id='qtyinput' />
                    </form>
                  </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => {
                let qty = parseInt(document.getElementById('qtyinput').value)
                if (product.clothing_size_id == 1) {
                  let size = document.getElementById('selector').value
                  const clothingPrice = filteredPrices[filteredSizes.indexOf(size)];
                  if (subcategory !== null){
                    cartDisplayProduct ={
                      name: subcategory.subcategory_name + ' ' + product.product_name,
                      id: subcategory.subcategory_name + '_' + product.product_name,
                      price: clothingPrice,
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
                      price: clothingPrice,
                      currency: 'USD',
                
                      // image: image,
                      // product_data:{
                      //   location: category.category_location
                      // }
                    }
                  }
                  console.log(clothingPrice, size, "yay!")
                  addItem(cartDisplayProduct, {count: qty, product_metadata: {size: size, location: category.category_location, cell: product.order_form_cell}})
                }
                else {
                  addItem(cartDisplayProduct, {count: qty, product_metadata: {location: category.category_location, cell: product.order_form_cell}})
                }
                
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

export default ClothingDisplay