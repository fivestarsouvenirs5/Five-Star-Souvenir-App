// 'use client'
// import React from 'react'
// import { Button, Modal } from 'flowbite-react';
// import { useState } from 'react';
// import { formatCurrencyString } from 'use-shopping-cart';
// import { useUser } from '@auth0/nextjs-auth0/client';
// import Image from "next/image";


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
  

// // const ImgSrc = ( { subcategory, category, product }) => {
// //   if (subcategory == null) {
// //     if (category.category_location == 0) {
// //       return (
// //         <img className="w-60"
// //               src={`/images/CATEGORIES/NJ/${encodeURIComponent(product.product_name)}.jpg`} 
// //               alt="My Image3"
// //               />
// //       )
// //     }
// //     else {
// //       return (
// //       <img className="w-60"
// //               src={`/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(product.product_name)}.jpg`} 
// //               alt="My Image1"
// //               />
// //       )
// //     }
    
// //   }
// //   else {
// //     return (
// //       <img className="w-60"
// //               src={`/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(subcategory.subcategory_name)}/${encodeURIComponent(product.product_name)}.jpg`} 
// //               alt="My Image2"
// //               />
// //     )
// //   }
// // }


// const ProductDisplay = ({ product, category, subcategory, addItem, approved}) => {
//   const {user} = useUser();
//   const [openModal, setOpenModal] = useState(false);


//   if (user && approved === "true") {
     
//       //  var size = document.getElementById('selector').value
//       var cartDisplayProduct
//       if (subcategory !== null){
//         cartDisplayProduct ={
//           name: subcategory.subcategory_name + ' ' + product.product_name,
//           id: subcategory.subcategory_name + '_' + product.product_name,
//           price: product.price,
//           currency: 'USD',
//           // image: image,
//           // product_data:{
//           //   location: category.category_location
//           // }
//         }
//       }
//       else {
//         cartDisplayProduct ={
//           name: category.category + ' ' + product.product_name,
//           id: category.category + '_' + product.product_name,
//           price: product.price,
//           currency: 'USD',
//           // image: image,
//           // product_data:{
//           //   location: category.category_location
//           // }
//         }
//       }
     
//       return (
//         <>
//           <div className="border-2 bg-red-100 flex flex-col items-center">
//             <button className="border-b-2" onClick={() => setOpenModal(true)}>
//               <ImgSrc category = {category} subcategory={subcategory} product = {product} />
//             </button>
//             <label className="flex justify items-center">
//               {product.product_name}
//             </label>
//             {formatCurrencyString({ value: product.price, currency: 'USD' })}
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
//                     <p>Price: {formatCurrencyString({ value: product.price, currency: 'USD' })}</p>
//                     <Category category = {category} subcategory = {subcategory} />
//                     <Stock product= {product} />
//                     <form>
//                         <label>Qty: </label>
//                         <input type='number' min='1' placeholder='1' name='quantity' className='rounded-sm w-[81px] h-7' id='qtyinput' />
//                     </form>
//                   </div>
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={() => {
//                 let qty = parseInt(document.getElementById('qtyinput').value)
//                   addItem(cartDisplayProduct, {count: qty, product_metadata: {location: category.category_location, cell: product.order_form_cell}})
               
               
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


// export default ProductDisplay

'use client'
import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { formatCurrencyString } from 'use-shopping-cart';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";
import { decode } from 'he'; // Importing decode function from he module

const Stock = ({ product }) => {
  const decodedStock = decode(product.in_stock); // Decoding stock status
  if (decodedStock === "In Stock") {
    return (
      <h2 className="text-emerald-500">{decodedStock}</h2>
    )
  }
  else {
    return (
      <h2 className="text-red-300">{decodedStock}</h2>
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

const ImgSrc = ({ subcategory, category, product }) => {
  if (product.image_id) {
    return (
      <Image className="w-60" src={product.image_id} alt="Product Image" width={300} height={400} />
    )
  }
  else {
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


const ProductDisplay = ({ product, category, subcategory, addItem, approved }) => {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  if (user && approved === "true") {
    // Other code remains unchanged
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
   

    const handleChange = (event) => {
      const { value } = event.target;
      // Check if the input contains a dash
      if (/^[0-9]*$/.test(value)) {
        setInputValue(value);
      }
    };

    return (
      <>
        <div className="border-2 bg-red-100 flex flex-col items-center">
          <button className="border-b-2" onClick={() => setOpenModal(true)}>
            <ImgSrc category={category} subcategory={subcategory} product={product} />
          </button>
          <label className="flex justify items-center">
            {decode(product.product_name)} {/* Displaying decoded product name */}
          </label>
          {formatCurrencyString({ value: product.price, currency: 'USD' })}
        </div>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Product Info:</Modal.Header>
          <Modal.Body>
            <div className="flex justify-between">
              <div>
                <ImgSrc category={category} subcategory={subcategory} product={product} />
              </div>
              <div>
                <h2>Product Name: {decode(product.product_name)}</h2> {/* Displaying decoded product name */}
                <p>Price: {formatCurrencyString({ value: product.price, currency: 'USD' })}</p>
                <Category category={category} subcategory={subcategory} /> {/* Displaying decoded category/subcategory names */}
                <Stock product={product} /> {/* Displaying decoded stock status */}
                <form>
                  <label>Qty: </label>
                  <input type='text' min='1' placeholder='1' name='quantity' className='rounded-sm w-[81px] h-7' id='qtyinput' value={inputValue} onChange={handleChange}/>
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {
              // Adding item to cart
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