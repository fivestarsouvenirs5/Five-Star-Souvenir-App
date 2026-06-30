
'use client'
import React, { lazy } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";
import { decode } from 'he'; // Importing decode function from he module
import { toast } from 'sonner';
import {
  Card,
  CardContent,
} from "@/components/ui/card";



const SizeDisplay = ({ sizeList }) => {

  return (


    <div class="mb-3">
    <label class="block text-base mb-1">Qty:</label>
    <div>
      {sizeList.map((size, index) => (
        <div class="flex items-center mb-1" key={index}>
          <label class="mr-1 text-sm">{size}</label>
          <input
            id={size}
            type="number"
            min="0"
            class="border border-gray-300 rounded-none p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      ))}
    </div>
  </div>
  
  
  );
}

const Stock = ({ product }) => {
  const decodedStock = decode(product.in_stock); // Decoding stock status
  if (decodedStock === "In Stock") {
    return (
      <h2 className="text-emerald-500">{decodedStock}</h2>
    )
  }
  else {
    return (
      <h2 className="text-red-600">{decodedStock}</h2>
    )
  }
}

const Category = ({ subcategory, category }) => {
  const decodedCategory = decode(category.category); // Decoding category name
  if (subcategory == null) {
    return (
      <h2>Category: {decodedCategory}</h2>
    )
  }
  else {
    const decodedSubcategory = decode(subcategory.subcategory_name); // Decoding subcategory name
    return (
      <h2>Category: {decodedCategory}, {decodedSubcategory}</h2>
    )
  }
}

const ClothingDisplay = ({ isEditing, product, category, subcategory, addItem, clothe, approved, cartCount, img }) => {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);

  if (user && approved === "true") {

    const filteredSizes = clothe.map(item => item.size);
      const filteredPrices = clothe.map(item => item.price);
      const filteredCellNumbers = clothe.map(item => item.clothing_order_form_cell);

    return (
      <>
        <Card className="w-full max-w-[300px] h-[360px] bg-white border shadow-md rounded-2xl">
          <CardContent className="h-full p-4 flex flex-col gap-2">
            <button
              onClick={() => setOpenModal(true)}
              className="group flex flex-col h-full"
            >
              {/* IMAGE SECTION (matches ProductDisplay) */}
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <Image
                  src={img}
                  alt={decode(product.product_name)}
                  width={500}
                  height={500}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* TEXT SECTION (matches ProductDisplay) */}
              <div className="h-[90px] flex flex-col justify-center text-center">
                <p className="text-xs uppercase tracking-wide text-red-700">
                  {decode(category.category)}
                </p>

                <h3 className="font-semibold text-lg leading-tight">
                  {decode(product.product_name)}
                </h3>

                <p className="text-gray-500 text-sm">
                  {formatCurrencyString({
                    value: filteredPrices[0],
                    currency: "USD",
                  })}{" "}
                  to{" "}
                  {formatCurrencyString({
                    value: filteredPrices[filteredPrices.length - 1],
                    currency: "USD",
                  })}
                </p>
              </div>
            </button>
          </CardContent>
        </Card>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Product Info:</Modal.Header>
          <Modal.Body>
            <div className="flex justify-between">
              <div>
                <Image className="w-60"
                  src={img}
                  alt="Product Image"
                  width={300}
                  height={400}
                />
              </div>
              <div>
                <h2>Product Name:  {decode(product.product_name)}</h2> {/* Displaying decoded product name */}
                <p>Price: {formatCurrencyString({ value: filteredPrices[0], currency: 'USD' })} to {formatCurrencyString({ value: filteredPrices[filteredPrices.length - 1], currency: 'USD' })}
                </p>
                <Category category={category} subcategory={subcategory} /> {/* Displaying decoded category/subcategory names */}
                <Stock product={product} /> {/* Displaying decoded stock status */}
                <form>
                  <SizeDisplay product={product} sizeList={filteredSizes} />
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {
              // Adding item to cart
            let totalAdded = 0;
              let sizes = [];
              for (const element of filteredSizes) {
                let sizeInput = document.getElementById(element);
                if (sizeInput.value > 0) {
                  sizes.push(sizeInput);
                }
              }
             if (sizes.length > 0) {
              const clothingPrices = sizes.map(sizeElement => {
                return filteredPrices[filteredSizes.indexOf(sizeElement.id)
                ]});
              const clothingCellNumbers = sizes.map(sizeElement => {
                return filteredCellNumbers[filteredSizes.indexOf(sizeElement.id)]
              });
              
                 
              for (let i = 0; i < sizes.length; i++) {
                var cartDisplayProduct
               
                if (subcategory !== null){
                  cartDisplayProduct ={
                    name:  product.product_name,
                    id: subcategory.subcategory_name + '_' + product.product_name + '_' + sizes[i].id,
                    price: clothingPrices[i],
                    currency: 'USD',
                    // image: image,
                    // product_data:{
                    //   location: category.category_location
                    // }
                  }
                }
                else {
                  cartDisplayProduct ={
                    name:  product.product_name,
                    id: category.category + '_' + product.product_name + '_' + sizes[i].id,
                    price: clothingPrices[i],
                     currency: 'USD',
            
                      // image: image,
                      // product_data:{
                     //   location: category.category_location
                     // }
                 }
                }
                // console.log(clothingPrice, size, "yay!")
                addItem(cartDisplayProduct, {count: parseInt(sizes[i].value), product_metadata: {size: sizes[i].id, location: category.category_location, cell: clothingCellNumbers[i], product_qty: product.set_qty, category: category.category, subcategory: subcategory ? subcategory.subcategory_name : null, image_url: img}})
                totalAdded += parseInt(sizes[i].value);
              }

             
              
            }
            
            
            setOpenModal(false);
              toast.success( `${totalAdded} item(s) added. Total items: ${cartCount + totalAdded}`, {
                                      className: "!bg-neutral-beige-light !text-text-dark",
                                      duration: 5000,
                                    });
             
            }}>Add to Cart</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  else {
      return (
        <>
          <div className="border-2 bg-red-100 flex flex-col items-center h-full">
            <div className="flex-grow flex-[3] w-full flex items-center justify-center">
              <Image className="w-60"
                src={img}
                alt="Product Image"
                width={300}
                height={400}
              />
            </div>
            <label className="flex-grow flex-[1] w-full flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold">
              {product.product_name}
            </label>
          </div>

          
        </>
      );
  }
  
}

export default ClothingDisplay