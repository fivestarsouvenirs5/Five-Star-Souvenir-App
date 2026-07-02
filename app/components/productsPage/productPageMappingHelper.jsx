 
'use client'
import React from 'react'
import CategoryNJ from '../categorynj'
import CategoryNY from '../categoryny'
import ProductDisplay from './productdisplay'
import ClothingDisplay from './clothingDisplay'
import SubCategoryNY from './subcategoryny'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { useMyUser } from "../../context/userContext";
import EditProductButton from '../editProductButton';
import EditClothingButton from '../editClothingButton';

import { Trash2 } from "lucide-react";

const DeleteButton= ({item, type, isEditing, admin}) => {
  const { myUser, isSignedIn } = useMyUser();
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
  if (isSignedIn && myUser?.app_metadata?.admin) {
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
            {isEditing && (<button className="bg-destructive hover:bg-red-300 text-white px-2 py-1 rounded-md" onClick={() => setOpenModal(true)}> 
                 <Trash2 className="w-5 h-5 text-white cursor-pointer " /> 
                </button>)}
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
    return null;
  }
  
}

const ImgSrc = (category, subcategory, product) => {
  if (product.image_id) {
    return product.image_id;
  }

  if (!subcategory) {
    if (category.category_location == 0) {
      return `/images/CATEGORIES/NJ/${encodeURIComponent(product.product_name)}.jpg`;
    }

    return `/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(product.product_name)}.jpg`;
  }

  return `/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(subcategory.subcategory_name)}/${encodeURIComponent(product.product_name)}.jpg`;
};


 const ProductPageMappingHelper = ({ isEditing, products, categoryList, subcategoryList, isNY, category, subcategory, clothingList, subMainCategory, isAdmin, isApproved, stores }) => {
  const { myUser, isSignedIn } = useMyUser();
    const cart = useShoppingCart();
    const { addItem, formattedTotalPrice, cartCount } = cart;
    const [myProducts, setMyProducts] = useState(products);
    // const [quantities, setQuantities] = useState({});
    // const admin = getAppMetadata(user.email)
    // console.log(admin)

    const EditButton = ({product, admin, clothingList, isEditing}) => {
      
      //console.log(filteredClothes);
      // const filteredSizes = filteredClothes.map(item => item.size);
      // // console.log("sizes" + filteredSizes)
      if (product.clothing_size_id == 1) {
        const filteredClothes = clothingList.filter(item => item.clothing_product_id === product.product_id);
        
          return (
            <>
                {isEditing && (<EditClothingButton product={product} admin={admin} sizes={filteredClothes}/>)}
            </>
            
             
        )
      }
      else {
        return (
            <>
               {isEditing && (<EditProductButton product={product} admin={admin} />)}
            </>
         
        )
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
            <div className="flex items-center justify-center gap-2 mt-1">
              <label htmlFor={`qty-${p.product_id}`} className="text-sm font-medium">Qty:</label>
              <select id={`qty-${p.product_id}`} placeholder="0" className="border px-2 py-1 rounded">
                {qtyList.map((qty) => (
                  <option key={qty} value={qty}>{qty}</option>
                ))}
              </select>
              <div className="mt-3 flex justify-center gap-2">
                            <DeleteButton
                                item={myProduct}
                                type="Product"
                                admin={isAdmin}
                                isEditing={isEditing}
                            />

                            <EditButton
                                isEditing={isEditing}
                                product={myProduct}
                                admin={isAdmin}
                                clothingList={clothingList}
                            />
                </div>
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
                <div className="mt-3 flex justify-center gap-2">
                            <DeleteButton
                                item={myProduct}
                                type="Product"
                                admin={isAdmin}
                                isEditing={isEditing}
                            />

                            <EditButton
                                isEditing={isEditing}
                                product={myProduct}
                                admin={isAdmin}
                                clothingList={clothingList}
                            />
                        </div>
              </div>
          
        )
      }
      
    }

    const Cloth = ({ product, category, subcategory, addItem, clothingList }) => {
      if (product.clothing_size_id == 1) {
        if (subcategory == null) {
          const filteredClothes = clothingList.filter(item => item.clothing_product_id === product.product_id);
          
          return (
            <div>
                <ClothingDisplay isEditing= {isEditing} product = {product} category = {category} subcategory={null} addItem={addItem} clothe={filteredClothes} approved={isApproved} cartCount={cartCount} img={ImgSrc(category, null, product)} />
                <div className="mt-3 flex justify-center gap-2">
                                <DeleteButton
                                    item={product}
                                    isEditing={isEditing}
                                    type="Product"
                                    admin={isAdmin}
                                />

                                <EditButton
                                    isEditing={isEditing}
                                    product={product}
                                    admin={isAdmin}
                                    clothingList={clothingList}
                                />
                            </div>
                </div>
          )
        }
        else {
          return (
            <div>
                <ClothingDisplay isEditing= {isEditing} product = {product} category = {category} subcategory={subcategory} addItem={addItem} approved={isApproved} cartCount={cartCount} img={ImgSrc(category, subcategory, product)} />
                 <div className="mt-3 flex justify-center gap-2">
                                <DeleteButton
                                    item={product}
                                    isEditing={isEditing}
                                    type="Product"
                                    admin={isAdmin}
                                />

                                <EditButton
                                    isEditing={isEditing}
                                    product={product}
                                    admin={isAdmin}
                                    clothingList={clothingList}
                                />
                            </div>
            </div>
        )
        }
      }
      else {
        if (subcategory == null && isApproved) {
          return (
            <div>
              <ProductDisplay
                isEditing={isEditing}
                product={product}
                category={category}
                subcategory={null}
                addItem={addItem}
                approved={isApproved}
                img={ImgSrc(category, null, product)}
                cartCount={cartCount}
              />
              {isSignedIn && (
                <div className="mt-3 w-full flex justify-center">
                  <QtyBtn myProduct={product} />
                </div>
              )}
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
                 isEditing={isEditing}
                product={product}
                category={category}
                subcategory={null}
                addItem={addItem}
                approved={isApproved}
                img={ImgSrc(category, null, product)}
                cartCount={cartCount}
              />
          )
        }
        else if (subcategory != null && isApproved) {
          return (
            <div>
              <ProductDisplay
                 isEditing={isEditing}
                product={product}
                category={category}
                subcategory={subcategory}
                addItem={addItem}
                approved={isApproved}
                img={ImgSrc(category, subcategory, product)}
                cartCount={cartCount}
              />
              {isSignedIn && (
                <div className="mt-3 w-full flex justify-center">
                  <QtyBtn myProduct={product} /> 
                </div>
              )}
         
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
                 isEditing={isEditing}
                product={product}
                category={category}
                subcategory={subcategory}
                addItem={addItem}
                approved={isApproved}
                img={ImgSrc(category, subcategory, product)}
                cartCount={cartCount}
              />
              </div>
          )
        
      }
      }
    }

    //category for ny
    if (categoryList !== null) {
      if (isNY == true) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-7 p-2 justify-items-center">
              {categoryList.map((category) => (
                <div key={category.category_id} className="mb-3 sm:mb-0">
                  <div className=" flex items-center justify-center max-w-full hover:bg-gray-300 mb-4">
                    {/* Adjust text sizes based on your preference and design */}
                    <CategoryNY category={category} />
                  </div>
                  <DeleteButton item={category} type={"Category"} admin={isAdmin} isEditing={isEditing} />

                </div>
              ))}
            </div>
                
        )
      }
      // is NJ categories
      else{
        return (
            
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-7 p-2 justify-items-center">
                      {categoryList.map((category) => (
                        <div key={category.category_id}>
                          <div className="border rounded-md flex items-center justify-center text-center max-w-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl" key={category.category_id} >                        
                              <CategoryNJ category = {category} />
                            
                          </div>
                          <DeleteButton item = {category} type ={"Category"} isEditing={isEditing} admin={isAdmin}/>
                        </div>
                      ))}

                  </div>
                 
        )
      }
    }

    //subcategory list for ny
    else if (subcategoryList !== null) {
      return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-7 p-2 justify-items-center">
                    {subcategoryList.map((subcategory) => (
                      <div key ={subcategory.subcategory_id}>
                        <div className="border p-5 h-[120px] w-[220px] rounded-md text-center items-center flex justify-center text-text-dark shadow-lg text-center text-xl font-bold bg-neutral-beige-light hover:bg-neutral-beige-dark" key={subcategory.subcategory_id} >
                            <SubCategoryNY subcategory = {subcategory} />
                            
                        </div>
                            <div className="mt-2">
                                <DeleteButton item ={subcategory} type ={"Subcategory"} isEditing={isEditing} admin={isAdmin}/>
                            </div>
                        </div>
                    ))}
              </div>
          
        
      )
    }
    // clothing 
    else if (subcategory === null) {
      return (
        <div>
     

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-8 justify-items-center">
            {products.map((product) => (
                  <div key={product.product_id}  className="flex flex-col items-center w-[220px]">
                      <div className="w-full">
                        <div className="flex items-center justify-center pb-4 text-[25px]">
                          <Cloth product = {product} category = {category} subcategory={subcategory} addItem={addItem} clothingList={clothingList} />

                          {/* <ProductDisplay product = {product} category = {category} subcategory={null} addItem={addItem}/> */}
                        </div>
                         
                        
                        {/* <EditProductButton product={product} admin={isAdmin}/>
                        <EditClothingButton product={product} admin={isAdmin}/> */}
                      </div>
                      
                    </div>
                ))}
              
            </div>
        </div>
      )
    }
  // non clothing products
    else {
      return (
        <div>
   


        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
              {products.map((product) => (
                      <div key={product.product_id}  className="flex flex-col items-center w-[220px]">
                      <div className="w-full">

                        <div className="flex items-center justify-center pb-4">
                          <Cloth product = {product} category = {category} subcategory={subcategory} addItem={addItem} />
                        
                          {/* <ProductDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem}/> */}
                        </div>
                       
                        {/* <EditProductButton product={product} admin={isAdmin} />
                        <EditClothingButton product={product} admin={isAdmin} /> */}
                      </div>
                      </div>
                  ))}
            </div>

          </div>

        )
    }
  }

  export default ProductPageMappingHelper;