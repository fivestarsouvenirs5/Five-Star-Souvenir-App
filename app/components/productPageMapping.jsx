// 'use client'
// import React from 'react'
// import CategoryNJ from './categorynj'
// import CategoryNY from './categoryny'
// import ProductDisplay from './productdisplay'
// import ClothingDisplay from './clothingDisplay'
// import SubCategoryNY from './subcategoryny'
// import Cart from './cart'
// import AddCategoryButton from './addCategoryButton'
// import AddSubCategoryButton from './addSubCategoryButton'
// import AddProductButton from './addProductButton'
// import { Button, Modal } from 'flowbite-react';
// import { useState } from 'react';
// import { useShoppingCart } from 'use-shopping-cart';
// import { useUser } from '@auth0/nextjs-auth0/client';
// import EditProductButton from './editProductButton';
// import EditClothingButton from './editClothingButton';

// const DeleteButton= ({item, type, admin}) => {
//   const { user} = useUser();
//   const [openModal, setOpenModal] = useState(false);
//   const [loading, setLoading] = useState(false);


//   var name;
//   if (type === "Category") {
//     name = item.category;
//   }
//   else if (type === "Subcategory") {
//     name = item.subcategory_name;
//   }
//   else if (type === "Product") {
//     name = item.product_name;
//   }
//   if (user && admin) {
//     async function handleClick() {
//       setLoading(true)
//       const response = await fetch('/api/delete', {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             myItem: item,
//             itemType: type
//           }),
//         });
  
//         if (!response.ok) {
//           const errorMessage = await response.json();
//           alert(errorMessage.error);
//           setOpenModal(false)
//         } else {
//            // console.log('Item Deleted Successfully');
//             setOpenModal(false)
//             setLoading(false)
//             window.location.reload()
//         }
//       }
//       return (
//         <div>
//             <button className="bg-red-500 text-white px-2 py-1 rounded-md mb-4" onClick={() => setOpenModal(true)}> 
//                   Delete
//                 </button>
//                 <Modal show={openModal} onClose={() => setOpenModal(false)}>
//                 <Modal.Header>Delete {type}</Modal.Header>
//                 <Modal.Body>
//                     <h3>Are you sure you want to delete {type} {name}?</h3>
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button onClick={handleClick}>{loading ? "Processing..." : "Yes"}</Button>
//                   <Button onClick={ () => {setOpenModal(false)}}>No</Button>
//                 </Modal.Footer>
//               </Modal>
//         </div>
//       )
//   }
//   else {
//     return(
//       <div> </div>
//     )
//   }
  
// }

// const ProductPageMapping = ({ products, categoryList, subcategoryList, isNY, category, subcategory, clothingList, subMainCategory, isAdmin, isApproved, stores }) => {
//  // const { user} = useUser();
//   const cart = useShoppingCart();
//   const { addItem, formattedTotalPrice } = cart;
//   const [myProducts, setMyProducts] = useState(products);
//   // const admin = getAppMetadata(user.email)
//   // console.log(admin)

//   const EditButton = ({product, admin, clothingList}) => {
    
//     //console.log(filteredClothes);
//     // const filteredSizes = filteredClothes.map(item => item.size);
//     // // console.log("sizes" + filteredSizes)
//     if (product.clothing_size_id == 1) {
//       const filteredClothes = clothingList.filter(item => item.clothing_product_id === product.product_id);
//         return (
//         <EditClothingButton product={product} admin={admin} sizes={filteredClothes}/>
//       )
//     }
//     else {
//       return (
//         <EditProductButton product={product} admin={admin} />
//       )
//     }
//   }

//   const Cloth = ({ product, category, subcategory, addItem, clothingList }) => {
//     if (product.clothing_size_id == 1) {
//       if (subcategory == null) {
//         const filteredClothes = clothingList.filter(item => item.clothing_product_id === product.product_id);
        
//         return (
//           <ClothingDisplay product = {product} category = {category} subcategory={null} addItem={addItem} clothe={filteredClothes} approved={isApproved} />
//         )
//       }
//       else {
//         return (
//           <ClothingDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem} approved={isApproved}/>
//         )
//       }
//     }
//     else {
//       if (subcategory == null) {
//         return (
//           <ProductDisplay product = {product} category = {category} subcategory={null} addItem={addItem} approved={isApproved}/>
//         )
//       }
//       else {
//         return (
//           <ProductDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem} approved={isApproved}/>
//         )
//       }
      
//     }
//   }

//   if (categoryList !== null) {
//     if (isNY == true) {
//       return (
//         <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-10">
//           <div className="grid grid-cols-1 sm:grid-cols-6 gap-5">
//             {categoryList.map((category) => (
//               <div key={category.category_id} className="mb-3 sm:mb-0">
//                 <div className="border rounded-md flex items-center justify-center text-center max-w-full p-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-blue-100 hover:bg-blue-300 mb-4">
//                   {/* Adjust text sizes based on your preference and design */}
//                   <CategoryNY category={category} />
//                 </div>
//                 <DeleteButton item={category} type={"Category"} admin={isAdmin} />

//               </div>
//             ))}
//             <AddCategoryButton location={1} admin={isAdmin}/>
//           </div>
//           {/* <div className="border-8 border-sky-500 float-right h-96"></div> */}
//           <Cart approved={isApproved} storeList={stores}/>
                

//         </div>
//       )
//     }
//     // is NJ
//     else{
//       return (
//         <div className = "flex justify-between gap-10">

          
//                 <div className="grid grid-cols-6 gap-5">
//                     {categoryList.map((category) => (
//                       <div key={category.category_id}>
//                         <div className="border rounded-md flex items-center justify-center text-center max-w-full p-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
//                             <CategoryNJ category = {category} />
                           
//                         </div>
//                         <DeleteButton item = {category} type ={"Category"} admin={isAdmin}/>
//                       </div>
//                     ))}
//                     <AddCategoryButton location={0} admin={isAdmin} />
//                 </div>
//                 {/* <div className="border-8 border-sky-500 float-right h-96"></div> */}
//                 <Cart approved={isApproved} storeList={stores}/>

//         </div>
//       )
//     }
//   }
//   else if (subcategoryList !== null) {
//     return (
//         <div className = "flex justify-between gap-10">

//             <div className="grid grid-cols-6 gap-5">
//                   {subcategoryList.map((subcategory) => (
//                     <div key ={subcategory.subcategory_id}>
//                       <div className="border p-5 rounded-md items-center justify-center text-center text-xl font-bold bg-blue-100 hover:bg-blue-300" key={subcategory.subcategory_id} >
//                           <SubCategoryNY subcategory = {subcategory} />
                          
//                       </div>
//                       <DeleteButton item ={subcategory} type ={"Subcategory"} admin={isAdmin}/>
//                       </div>
//                   ))}
//                 <AddSubCategoryButton category= {subMainCategory} admin={isAdmin}/>
//             </div>
//             <Cart approved={isApproved} storeList={stores}/>
//         </div>
        
      
//     )
//   }
//   else if (subcategory === null) {
//     return (
//       <div className = "flex justify-between gap-10">

//         <div className="grid grid-cols-6 gap-5">
//           {products.map((product) => (
//                   <div className="h-1/2" key={product.product_id} >
//                     <div className = "bg-white-600 rounded-2xl pl-2 pr-2 pt-2">
//                       <div className="flex items-center justify-center pb-4 text-[25px]">
//                         <Cloth product = {product} category = {category} subcategory={subcategory} addItem={addItem} clothingList={clothingList} />
//                         {/* <ProductDisplay product = {product} category = {category} subcategory={null} addItem={addItem}/> */}
//                       </div>
//                       <DeleteButton item={product} type={"Product"} admin={isAdmin} />
//                       <EditButton product={product} admin={isAdmin} clothingList={clothingList}/>
//                       {/* <EditProductButton product={product} admin={isAdmin}/>
//                       <EditClothingButton product={product} admin={isAdmin}/> */}
//                     </div>
                    
//                   </div>
//               ))}
//             <AddProductButton category={category} subcategory={null} admin={isAdmin} setProducts={setMyProducts} />
//             <AddSubCategoryButton category= {category} admin={isAdmin}/>
//           </div>
//           <Cart approved={isApproved} storeList={stores}/> 
//       </div>

//     )
//   }
//   else {
//     return (
//       <div className = "flex justify-between gap-10">

//           <div className="grid grid-cols-6 gap-5">
//             {products.map((product) => (
//                     <div className="h-1/2" key={product.product_id}>
//                       <div className = "bg-white-600 rounded-2xl pl-2 pr-2 pt-2">

//                       <div className="flex items-center justify-center pb-4">
//                         <Cloth product = {product} category = {category} subcategory={subcategory} addItem={addItem} />
//                         {/* <ProductDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem}/> */}
//                       </div>
//                       <DeleteButton item ={product} type={"Product"} admin={isAdmin} />
//                       <EditButton product={product} admin={isAdmin} clothingList={clothingList}/>
//                       {/* <EditProductButton product={product} admin={isAdmin} />
//                       <EditClothingButton product={product} admin={isAdmin} /> */}
//                     </div>
//                     </div>
//                 ))}
//             <AddProductButton category={category} subcategory={subcategory} admin={isAdmin} setProducts={setMyProducts}/>
//             <AddSubCategoryButton category= {category} admin={isAdmin}/>
//           </div>
//           <Cart approved={isApproved} storeList={stores}/> 

//         </div>
            
//       )
//   }
// }

// export default ProductPageMapping




'use client'
import React from 'react'
import CategoryNJ from './categorynj'
import CategoryNY from './categoryny'
import ProductDisplay from './productdisplay'
import ClothingDisplay from './clothingDisplay'
import SubCategoryNY from './subcategoryny'
import Cart from './cart'
import AddCategoryButton from './addCategoryButton'
import AddSubCategoryButton from './addSubCategoryButton'
import AddProductButton from './addProductButton'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { useUser } from '@auth0/nextjs-auth0/client';
import EditProductButton from './editProductButton';
import EditClothingButton from './editClothingButton';

const DeleteButton= ({item, type, admin}) => {
  const { user} = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);


  var name;
  if (type === "Category") {
    name = item.category;
  }
  else if (type === "Subcategory") {
    name = item.subcategory_name;
  }
  else if (type === "Product") {
    name = item.product_name;
  }
  if (user && admin) {
    async function handleClick() {
      setLoading(true)
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            myItem: item,
            itemType: type
          }),
        });
  
        if (!response.ok) {
          const errorMessage = await response.json();
          alert(errorMessage.error);
          setOpenModal(false)
        } else {
           // console.log('Item Deleted Successfully');
            setOpenModal(false)
            setLoading(false)
            window.location.reload()
        }
      }
      return (
        <div>
            <button className="bg-red-500 text-white px-2 py-1 rounded-md mb-4" onClick={() => setOpenModal(true)}> 
                  Delete
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Delete {type}</Modal.Header>
                <Modal.Body>
                    <h3>Are you sure you want to delete {type} {name}?</h3>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClick}>{loading ? "Processing..." : "Yes"}</Button>
                  <Button onClick={ () => {setOpenModal(false)}}>No</Button>
                </Modal.Footer>
              </Modal>
        </div>
      )
  }
  else {
    return(
      <div> </div>
    )
  }
  
}

const ProductPageMapping = ({ products, categoryList, subcategoryList, isNY, category, subcategory, clothingList, subMainCategory, isAdmin, isApproved, stores }) => {
 // const { user} = useUser();
  const cart = useShoppingCart();
  const { addItem, formattedTotalPrice } = cart;
  const [myProducts, setMyProducts] = useState(products);
  // const [quantities, setQuantities] = useState({});
  // const admin = getAppMetadata(user.email)
  // console.log(admin)

  const EditButton = ({product, admin, clothingList}) => {
    
    //console.log(filteredClothes);
    // const filteredSizes = filteredClothes.map(item => item.size);
    // // console.log("sizes" + filteredSizes)
    if (product.clothing_size_id == 1) {
      const filteredClothes = clothingList.filter(item => item.clothing_product_id === product.product_id);
        return (
        <EditClothingButton product={product} admin={admin} sizes={filteredClothes}/>
      )
    }
    else {
      return (
        <EditProductButton product={product} admin={admin} />
      )
    }
  }

  const AddAllToCartButton = () => {
    if (products.length > 0) {
      if (products[0].clothing_size_id !== 1 && isApproved) {
        return(
      <div className="mt-5">
                  <Button
                    onClick={() => {
                      Object.entries(products).forEach(([productId, product]) => {
                        if (document.getElementById(`qty-${product.product_id}`).value > 0) {
                          const quantity = parseInt(document.getElementById(`qty-${product.product_id}`).value, 10);
                       
                            const cartDisplayProduct = {
                              name: category.category + ' ' + product.product_name,
                              id: category.category + '_' + product.product_name,
                              price: product.price,
                              currency: 'USD',
                            };
                            addItem(cartDisplayProduct, { count: quantity, product_metadata: { location: category.category_location, cell: product.order_form_cell } });
                          
                        }
                         
                      });
                    //   Object.entries(quantities).forEach(([productId, quantity]) => {
                    //     if (quantity > 0) {
                    //       const product = products.find(p => p.product_id === parseInt(productId));
                          
                    //       if (product) {
                    //       var cartDisplayProduct ={
                    //         name: category.category + ' ' + product.product_name,
                    //         id: category.category + '_' + product.product_name,
                    //         price: product.price,
                    //         currency: 'USD',
                    //       }
                    //       addItem(cartDisplayProduct, {count: quantity, product_metadata: {location: category.category_location, cell: product.order_form_cell}});
                    //       }
                    //     }
                    //   });
                    //   setQuantities({});
                     }}
                  >
                    Add All to Cart
                  </Button>
                </div>
        )
      }
  }
  }

  const QtyBtn = (myProduct) => {
    var p = myProduct.myProduct;
    if (p.set_qty !== null && p.set_qty > 0) {
      var qtyList = [];
      for (let i = 0; i <= p.set_qty * 6; i += p.set_qty) {
        qtyList.push(i);
      }
      return (
        <div>
          <div className="flex items-center gap-2 mt-1">
            <label htmlFor={`qty-${p.product_id}`} className="text-sm font-medium">Qty:</label>
            <select id={`qty-${p.product_id}`} placeholder="0" className="border px-2 py-1 rounded">
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
              <label htmlFor={`qty-${p.product_id}`} className="text-sm font-medium">Qty:</label>
              <input
                id={`qty-${p.product_id}`}
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

  const Cloth = ({ product, category, subcategory, addItem, clothingList }) => {
    if (product.clothing_size_id == 1) {
      if (subcategory == null) {
        const filteredClothes = clothingList.filter(item => item.clothing_product_id === product.product_id);
        
        return (
          <ClothingDisplay product = {product} category = {category} subcategory={null} addItem={addItem} clothe={filteredClothes} approved={isApproved} />
        )
      }
      else {
        return (
          <ClothingDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem} approved={isApproved}/>
        )
      }
    }
    else {
      if (subcategory == null && isApproved) {
        return (
          <div>
            <ProductDisplay
              product={product}
              category={category}
              subcategory={null}
              addItem={addItem}
              approved={isApproved}
            />
            <QtyBtn myProduct ={product}/>
            {/* <div className="flex items-center gap-2 mt-1">
              <label htmlFor={`qty-${product.product_id}`} className="text-sm font-medium">Qty:</label>
              <input
                id={`qty-${product.product_id}`}
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
            </div> */}
          </div>

        )
      }
      else if (subcategory == null && !isApproved) {
        return (
            <ProductDisplay
              product={product}
              category={category}
              subcategory={null}
              addItem={addItem}
              approved={isApproved}
            />
        )
      }
      else if (subcategory != null && isApproved) {
        return (
          <div>
            <ProductDisplay
              product={product}
              category={category}
              subcategory={subcategory}
              addItem={addItem}
              approved={isApproved}
            />
          <QtyBtn myProduct ={product}/>
            {/* <div className="flex items-center gap-2 mt-1">
              <label htmlFor={`qty-${product.product_id}`} className="text-sm font-medium">Qty:</label>
              <input
                id={`qty-${product.product_id}`}
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
            </div> */}
          </div>
        )
      }
      else {
        return (
          <div>
            <ProductDisplay
              product={product}
              category={category}
              subcategory={subcategory}
              addItem={addItem}
              approved={isApproved}
            />
            </div>
        )
      
    }
    }
  }

  if (categoryList !== null) {
    if (isNY == true) {
      return (
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {categoryList.map((category) => (
              <div key={category.category_id} className="mb-3 sm:mb-0">
                <div className="border rounded-md flex items-center justify-center text-center max-w-full p-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-blue-100 hover:bg-blue-300 mb-4">
                  {/* Adjust text sizes based on your preference and design */}
                  <CategoryNY category={category} />
                </div>
                <DeleteButton item={category} type={"Category"} admin={isAdmin} />

              </div>
            ))}
            <AddCategoryButton location={1} admin={isAdmin}/>
          </div>
          {/* <div className="border-8 border-sky-500 float-right h-96"></div> */}
          <Cart approved={isApproved} storeList={stores}/>
                

        </div>
      )
    }
    // is NJ
    else{
      return (
        <div className = "flex justify-between gap-10">

          
                <div className="grid grid-cols-6 gap-5">
                    {categoryList.map((category) => (
                      <div key={category.category_id}>
                        <div className="border rounded-md flex items-center justify-center text-center max-w-full p-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                            <CategoryNJ category = {category} />
                           
                        </div>
                        <DeleteButton item = {category} type ={"Category"} admin={isAdmin}/>
                      </div>
                    ))}
                    <AddCategoryButton location={0} admin={isAdmin} />
                </div>
                {/* <div className="border-8 border-sky-500 float-right h-96"></div> */}
                <Cart approved={isApproved} storeList={stores}/>

        </div>
      )
    }
  }
  else if (subcategoryList !== null) {
    return (
        <div className = "flex flex-col lg:flex-row justify-between gap-5">

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                  {subcategoryList.map((subcategory) => (
                    <div key ={subcategory.subcategory_id}>
                      <div className="border p-5 rounded-md items-center justify-center text-center text-xl font-bold bg-blue-100 hover:bg-blue-300" key={subcategory.subcategory_id} >
                          <SubCategoryNY subcategory = {subcategory} />
                          
                      </div>
                      <DeleteButton item ={subcategory} type ={"Subcategory"} admin={isAdmin}/>
                      </div>
                  ))}
                <AddSubCategoryButton category= {subMainCategory} admin={isAdmin}/>
            </div>
            <Cart approved={isApproved} storeList={stores}/>
        </div>
        
      
    )
  }
  else if (subcategory === null) {
    return (
      <div>
       <AddAllToCartButton/>
      <div className = "flex flex-col lg:flex-row justify-between gap-5">

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {products.map((product) => (
                  <div className="h-1/2" key={product.product_id} >
                    <div className = "bg-white-600 rounded-2xl pl-2 pr-2 pt-2">
                      <div className="flex items-center justify-center pb-4 text-[25px]">
                        <Cloth product = {product} category = {category} subcategory={subcategory} addItem={addItem} clothingList={clothingList} />

                        {/* <ProductDisplay product = {product} category = {category} subcategory={null} addItem={addItem}/> */}
                      </div>
                      <DeleteButton item={product} type={"Product"} admin={isAdmin} />
                      <EditButton product={product} admin={isAdmin} clothingList={clothingList}/>
                      {/* <EditProductButton product={product} admin={isAdmin}/>
                      <EditClothingButton product={product} admin={isAdmin}/> */}
                    </div>
                    
                  </div>
              ))}
             

            <AddProductButton category={category} subcategory={null} admin={isAdmin} setProducts={setMyProducts} />
            <AddSubCategoryButton category= {category} admin={isAdmin}/>
          </div>
          <Cart approved={isApproved} storeList={stores}/> 
      </div>
  </div>
    )
  }
  else {
    return (
      <div>
         <AddAllToCartButton/>
      <div className = "flex flex-col lg:flex-row justify-between gap-5">

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {products.map((product) => (
                    <div className="h-1/2" key={product.product_id}>
                      <div className = "bg-white-600 rounded-2xl pl-2 pr-2 pt-2">

                      <div className="flex items-center justify-center pb-4">
                        <Cloth product = {product} category = {category} subcategory={subcategory} addItem={addItem} />
                      
                        {/* <ProductDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem}/> */}
                      </div>
                      <DeleteButton item ={product} type={"Product"} admin={isAdmin} />
                      <EditButton product={product} admin={isAdmin} clothingList={clothingList}/>
                      {/* <EditProductButton product={product} admin={isAdmin} />
                      <EditClothingButton product={product} admin={isAdmin} /> */}
                    </div>
                    </div>
                ))}
            <AddProductButton category={category} subcategory={subcategory} admin={isAdmin} setProducts={setMyProducts}/>
            <AddSubCategoryButton category= {category} admin={isAdmin}/>
          </div>
          <Cart approved={isApproved} storeList={stores}/> 

        </div>
        </div>    
      )
  }
}

export default ProductPageMapping
