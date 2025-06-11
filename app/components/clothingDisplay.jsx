// 'use client'
// import React from 'react'
// import { Button, Modal } from 'flowbite-react';
// import { useState } from 'react';
// import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
// import { useUser } from '@auth0/nextjs-auth0/client';
// import Image from "next/image";


// let selected_size = "";


// const Selector = ( {sizeList} ) => {
//   const [selectedSize, setSelectedSize] = useState('');

//   const handleSizeChange = (event) => {
//     setSelectedSize(event.target.value);
//   };

//     return (
//         <div>
//             <label >Please Select a Size: </label>
//             <select id='selector' onChange={handleSizeChange} value={selectedSize}>
//               <option value="" disabled>--</option> {/* not good cuz someone may add to cart with this selected */}
//               {sizeList.map((size, index) => (
//                 <option key={index} value={size}>{size}</option>
//               ))}
//             </select>
//             <br></br>
//             <label hidden>{selected_size = selectedSize}</label>

//         </div>
        
//     )
// }

// const Stock = ( {product} ) => {
//   if (product.in_stock === "In Stock") {
//     return (
//       <h2 className ="text-emerald-500">{product.in_stock}</h2>
//     )
//   }
//   else {
//     return (
//       <h2 className= "text-red-300">{product.in_stock}</h2>
//     )
//   }
// }

// const Category = ( { subcategory, category }) => {
//   if (subcategory == null) {
//     return (
//       <h2>Category: {category.category} </h2>
//     )
//   }
//   else {
//     return (
//       <h2>Category: {category.category}, {subcategory.subcategory_name}</h2>
//     )
//   }
// }

// // const ImgSrc = ( {product }) => {
// //   if(product.image_id) {
// //     return (
// //       <Image className="w-60"
// //                 src={product.image_id}
// //                 alt="My Image2"
// //                 width={300}
// //                 height={400}
// //                 />
// //     )
// //   }
// //   else {
// //     return (
// //       <img className="w-60"
// //                 src="/images/CATEGORIES/cat/cat1.jpg"
// //                 alt="My Image23"
// //                 />
// //     )
// //   }
    
// //   }

// const ImgSrc = ( { subcategory, category, product }) => {
//   if(product.image_id) {
//     return (
//       <Image className="w-60"
//                 src={product.image_id}
//                 alt="My Image2"
//                 width={300}
//                 height={400}
//                 />
//     )
//   }
//   else {
//     // return (
//     //   <img className="w-60"
//     //             src="/images/CATEGORIES/cat/cat1.jpg"
//     //             alt="My Image23"
//     //             />
//     // )
//     if (subcategory == null) {
//       if (category.category_location == 0) {
//         return (
//           <Image className="w-60"
//                 src={`/images/CATEGORIES/NJ/${encodeURIComponent(product.product_name)}.jpg`} 
//                 alt="My Image3"
//                 width={300}
//                 height={400}
//                 />
//         )
//       }
//       else {
//         return (
//         <Image className="w-60"
//                 src={`/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(product.product_name)}.jpg`} 
//                 alt="My Image1"
//                 width={300}
//                 height={400}
//                 />
//         )
//       }
      
//     }
//     else {
//       return (
//         <Image className="w-60"
//                 src={`/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(subcategory.subcategory_name)}/${encodeURIComponent(product.product_name)}.jpg`} 
//                 alt="My Image2"
//                 width={300}
//                 height={400}
//                 />
//       )
//     }
//   }
    
// }
  
  

// const ClothingDisplay = ({ product, category, subcategory, addItem, clothe, approved}) => {
//   const {user} = useUser();
//   const [openModal, setOpenModal] = useState(false);

//   // console.log(clothe, product.product_id)

  
//   if (user && approved === "true") {
//       const filteredSizes = clothe.map(item => item.size);
//       const filteredPrices = clothe.map(item => item.price);
//       const filteredCellNumbers = clothe.map(item => item.clothing_order_form_cell);

//       return (
//         <>
//           <div className="border-2 bg-red-100 flex flex-col items-center">
//             <button className="border-b-2" onClick={() => setOpenModal(true)}> 
//               <ImgSrc category = {category} subcategory={subcategory} product = {product} />
//             </button>
//             <label className="flex justify items-center">
//               {product.product_name}
//             </label>
//             <p className="text-[16px]">{formatCurrencyString({ value: filteredPrices[0], currency: 'USD' })} to {formatCurrencyString({ value: filteredPrices[filteredPrices.length - 1], currency: 'USD' })}</p>
//         </div>
        
//           <Modal show={openModal} onClose={() => setOpenModal(false)}>
//             <Modal.Header>Product Info:</Modal.Header>
//             <Modal.Body>
//                 <div className = "flex justify-between">              
//                   <div>
//                   <ImgSrc category = {category} subcategory={subcategory} product = {product} />
//                   </div>
//                   <div>
//                     <h2>Product Name: {product.product_name}</h2>
//                     <p>Price: {formatCurrencyString({ value: filteredPrices[0], currency: 'USD' })} to {formatCurrencyString({ value: filteredPrices[filteredPrices.length - 1], currency: 'USD' })}
//                     </p>
//                     <Category category = {category} subcategory = {subcategory} />
//                     <Stock product= {product} />
//                     <form>
//                         <Selector product= {product} sizeList={filteredSizes} />
//                         <label>Qty: </label>
//                         <input type='number' min='1' placeholder='1' name='quantity' className='rounded-sm w-[81px] h-7' id='qtyinput' />
//                     </form>
//                   </div>
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={() => {
//                   let qty = parseInt(document.getElementById('qtyinput').value)
//                   let size = document.getElementById('selector').value
//                   const clothingPrice = filteredPrices[filteredSizes.indexOf(size)];
//                   const clothingCellNumber = filteredCellNumbers[filteredSizes.indexOf(size)];

//                   var cartDisplayProduct
//                   if (subcategory !== null){
//                     cartDisplayProduct ={
//                       name: subcategory.subcategory_name + ' ' + product.product_name,
//                       id: subcategory.subcategory_name + '_' + product.product_name + '_' + size,
//                       price: clothingPrice,
//                       currency: 'USD',
//                       // image: image,
//                       // product_data:{
//                       //   location: category.category_location
//                       // }
//                     }
//                   }
//                   else {
//                     cartDisplayProduct ={
//                       name: category.category + ' ' + product.product_name,
//                       id: category.category + '_' + product.product_name + '_' + size,
//                       price: clothingPrice,
//                       currency: 'USD',
                
//                       // image: image,
//                       // product_data:{
//                       //   location: category.category_location
//                       // }
//                     }
//                   }
//                   // console.log(clothingPrice, size, "yay!")
//                   addItem(cartDisplayProduct, {count: qty, product_metadata: {size: size, location: category.category_location, cell: clothingCellNumber}})
                
//                 setOpenModal(false);
                
//               }}>Add to Cart</Button>
//             </Modal.Footer>
//           </Modal>
//         </>
//       );
//   }
//   else {
//       return (
//         <>
//           <div className="border-2 bg-red-100 flex flex-col items-center">
//               <ImgSrc category = {category} subcategory={subcategory} product = {product} />
//             <label className="flex justify items-center">
//               {product.product_name}
//             </label>
//           </div>
          
//         </>
//       );
//   }
  
// }

// export default ClothingDisplay
'use client'
import React, { lazy } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";
import { decode } from 'he'; // Importing decode function from he module



const SizeDisplay = ({ sizeList }) => {

  return (
    // <div>
    //   <label>Please Select a Size: </label>
    //   <select id='selector' onChange={handleSizeChange} value={selectedSize}>
    //     <option value="" disabled>--</option>
    //     {sizeList.map((size, index) => (
    //       <option key={index} value={size}>{size}</option>
    //     ))}
    //   </select>
    //   <br />
    //   <label hidden>{selected_size = selectedSize}</label>
    // </div>

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

const ImgSrc = ({ subcategory, category, product }) => {
  if (product.image_id) {
    return (
      <Image className="w-60"
        src={product.image_id}
        alt="Product Image"
        width={300}
        height={400}
      />
    )
  }
  else {
    // Image rendering code
    if (subcategory == null) {
      if (category.category_location == 0) {
        return (
          <Image className="w-60"
                src={`/images/CATEGORIES/NJ/${encodeURIComponent(product.product_name)}.jpg`} 
                alt="My Image3"
                width={300}
                height={400}
                />
        )
      }
      else {
        return (
        <Image className="w-60"
                src={`/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(product.product_name)}.jpg`} 
                alt="My Image1"
                width={300}
                height={400}
                />
        )
      }
      
    }
    else {
      return (
        <Image className="w-60"
                src={`/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(subcategory.subcategory_name)}/${encodeURIComponent(product.product_name)}.jpg`} 
                alt="My Image2"
                width={300}
                height={400}
                />
      )
    }
  }
}


const ClothingDisplay = ({ product, category, subcategory, addItem, clothe, approved }) => {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);

  if (user && approved === "true") {
    // Other code remains unchanged
    const filteredSizes = clothe.map(item => item.size);
      const filteredPrices = clothe.map(item => item.price);
      const filteredCellNumbers = clothe.map(item => item.clothing_order_form_cell);

    return (
      <>
        <div className="border-2 bg-red-100 flex flex-col items-center h-full">
            {/* Image/Button Section */}
            <div className="flex-grow flex-[3] w-full flex items-center justify-center">
              <button className="border-b-2" onClick={() => setOpenModal(true)}>
                <ImgSrc category={category} subcategory={subcategory} product={product} />
              </button>
            </div>
            
            {/* Label and Price Range Section */}
            <div className="flex-grow flex-[1] w-full flex flex-col items-center justify-center">
              <label className="text-sm sm:text-base md:text-lg font-semibold">
                {decode(product.product_name)} {/* Displaying decoded product name */}
              </label>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center">
                {formatCurrencyString({ value: filteredPrices[0], currency: 'USD' })} to {formatCurrencyString({ value: filteredPrices[filteredPrices.length - 1], currency: 'USD' })}
              </p>
            </div>
          </div>


        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Product Info:</Modal.Header>
          <Modal.Body>
            <div className="flex justify-between">
              <div>
                <ImgSrc category={category} subcategory={subcategory} product={product} />
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
                    name: subcategory.subcategory_name + ' ' + product.product_name,
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
                    name: category.category + ' ' + product.product_name,
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
                addItem(cartDisplayProduct, {count: parseInt(sizes[i].value), product_metadata: {size: sizes[i].id, location: category.category_location, cell: clothingCellNumbers[i]}})
              }
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
          <div className="border-2 bg-red-100 flex flex-col items-center h-full">
            <div className="flex-grow flex-[3] w-full flex items-center justify-center">
              <ImgSrc category={category} subcategory={subcategory} product={product} />
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