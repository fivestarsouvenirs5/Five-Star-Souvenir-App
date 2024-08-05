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
      if (subcategory == null) {
        return (
          <ProductDisplay product = {product} category = {category} subcategory={null} addItem={addItem} approved={isApproved}/>
        )
      }
      else {
        return (
          <ProductDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem} approved={isApproved}/>
        )
      }
      
    }
  }

  if (categoryList !== null) {
    if (isNY == true) {
      return (
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
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
      <div className = "flex flex-col lg:flex-row justify-between gap-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
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

    )
  }
  else {
    return (
      <div className = "flex flex-col lg:flex-row justify-between gap-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
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
            
      )
  }
}

export default ProductPageMapping
