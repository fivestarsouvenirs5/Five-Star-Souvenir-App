
'use client'
import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { formatCurrencyString } from 'use-shopping-cart';
import { useMyUser } from "../../context/userContext";
import Image from "next/image";
import { decode } from 'he'; // Importing decode function from he module
import { toast } from 'sonner';
import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
      <h2>Category: {decodedCategory} </h2>
    )
  }
  else {
    const decodedSubcategory = decode(subcategory.subcategory_name); // Decoding subcategory name
    return (
      <h2>Category: {decodedCategory}, {decodedSubcategory}</h2>
    )
  }
}


const ProductDisplay = ({ isEditing, product, category, subcategory, addItem, approved, img, cartCount }) => {
 const { myUser, isSignedIn } = useMyUser();
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  if (isSignedIn) {
    // Other code remains unchanged
     //  var size = document.getElementById('selector').value
     var cartDisplayProduct
     if (subcategory !== null){
       cartDisplayProduct ={
         name: product.product_name,
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
         name: product.product_name,
         id: category.category + '_' + product.product_name,
         price: product.price,
         currency: 'USD',
         // image: image,
         // product_data:{
         //   location: category.category_location
         // }
       }
     }
   
     const QtyButton = () => {

        if (product.set_qty !== null && product.set_qty > 0) {
          var qtyList = [];
          for (let i = 0; i <= product.set_qty * 6; i += product.set_qty) {
            qtyList.push(i);
          }
          return (
            <div>
              <div className="flex items-center gap-2 mt-1">
                <label htmlFor={`qtyinput`} className="text-sm font-medium">Qty:</label>
                <select id={`qtyinput`} placeholder="0" className="border px-2 py-1 rounded">
                  {qtyList.map((qty) => (
                    <option key={qty} value={qty}>{qty}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        }

        else {
          return (
                <div className="flex items-center gap-2 mt-1">
                  <label htmlFor={`qtyinput`} className="text-sm font-medium">Qty:</label>
                  <input
                    id={`qtyinput`}
                    type="number"
                    min="0"
                    placeholder="0"
                    // value={quantities[product.product_id] ?? ''}
                    // onChange={(e) => {
                    //   const input = e.target.value;
                    //   const qty = parseInt(input, 10);
                    //   setQuantities(prev => ({
                    //     ...prev,
                    //     [product.product_id]: input === '' ? '' : isNaN(qty) ? 0 : qty,
                    //   }));
                    // }}
                    className="border rounded px-2 py-1 w-20 text-center text-sm"
                  />
                </div>
            
          )
        }
    }

    const handleChange = (event) => {
      const { value } = event.target;
      // Check if the input contains a dash
      if (/^[0-9]*$/.test(value)) {
        setInputValue(value);
      }
    };

    return (
      <>
        {/* <div className="border-2 bg-red-100 flex flex-col items-center">
          <button className="border-b-2" onClick={() => setOpenModal(true)}>
            <ImgSrc category={category} subcategory={subcategory} product={product} />
          </button>
          <label className="flex justify items-center">
            {decode(product.product_name)} 
          </label>
          {formatCurrencyString({ value: product.price, currency: 'USD' })}
        </div> */}
    <Card className="w-full max-w-[300px] h-[360px] bg-white border shadow-md rounded-2xl">
      <CardContent className="h-full p-4 flex flex-col gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="group flex flex-col h-full"
          >
            {/* Image (70%) */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
                <Image
                    src={img}
                    alt={decode(product.product_name)}
                    width={500}
                    height={500}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Text (30%) */}
            <div className="h-[90px] flex flex-col justify-center text-center">
                <p className="text-xs uppercase tracking-wide text-red-700">
                    {decode(category.category)}
                </p>

                <h3 className="font-semibold text-lg leading-tight">
                    {decode(product.product_name)}
                </h3>

                <p className="text-gray-500">
                    {formatCurrencyString({
                        value: product.price,
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
                <Image className="w-60" src={img} alt="Product Image" width={300} height={400} />
              </div>
              <div>
                <h2>Product Name: {decode(product.product_name)}</h2> {/* Displaying decoded product name */}
                <p>Price: {formatCurrencyString({ value: product.price, currency: 'USD' })}</p>
                <Category category={category} subcategory={subcategory} /> {/* Displaying decoded category/subcategory names */}
                <Stock product={product} /> {/* Displaying decoded stock status */}
              <QtyButton />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {
              // Adding item to cart
              let qty = parseInt(document.getElementById('qtyinput').value)
              if (qty > 0) {
              addItem(cartDisplayProduct, {count: qty, product_metadata: {location: category.category_location, cell: product.order_form_cell,product_qty: product.set_qty, category: category.category, subcategory: subcategory ? subcategory.subcategory_name : null, image_url: img}});
            }
           
            setOpenModal(false);
            toast.success( `${qty} item(s) added. Total items: ${cartCount + qty}`, {
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
        {/* <div className="border-2 bg-red-100 flex flex-col items-center">
            <ImgSrc category = {category} subcategory={subcategory} product = {product} />
          <label className="flex justify items-center">
            {product.product_name}
          </label>
        </div> */}
        <Card className="w-full max-w-[300px] h-[360px] bg-white border shadow-md rounded-2xl">
          <CardContent className="h-full p-4 flex flex-col gap-2">
            <div className="flex flex-col gap-2 w-full">
               <div className="flex-1 flex items-center justify-center overflow-hidden">
                <Image
                  src={img}
                  alt={decode(product.product_name)}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="h-[90px] flex flex-col justify-center text-center">
                <p className="text-xs sm:text-sm uppercase tracking-wide text-secondary-dark font-medium">
                  {decode(category.category)}
                  {subcategory ? ` • ${decode(subcategory.subcategory_name)}` : ""}
                </p>

                <h3 className="text-sm sm:text-base font-semibold text-text-dark line-clamp-2">
                  {decode(product.product_name)}
                </h3>

                <p className="text-sm text-text">
                  {formatCurrencyString({
                    value: product.price,
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

       
      </>
    );
}

}


export default ProductDisplay