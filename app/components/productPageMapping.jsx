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

const DeleteButton= ({item, type}) => {
  const { user} = useUser();
  const [openModal, setOpenModal] = useState(false);
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
  if (user) {
    async function handleClick() {
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
            console.log('Item Deleted Successfully');
            setOpenModal(false)
            window.location.reload()
        }
      }
      return (
        <div>
            <button className="border-b-2" onClick={() => setOpenModal(true)}> 
                  Delete
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Delete {type}</Modal.Header>
                <Modal.Body>
                    <h3>Are you sure you want to delete {type} {name}?</h3>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClick}>Yes</Button>
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

const ProductPageMapping = ({ products, categoryList, subcategoryList, isNY, category, subcategory, clothingList, subMainCategory }) => {

  const cart = useShoppingCart();
  const { addItem, formattedTotalPrice } = cart;

  const Cloth = ({ product, category, subcategory, addItem, clothingList }) => {
    if (product.clothing_size_id == 1) {
      if (subcategory == null) {
        const filteredClothes = clothingList.filter(item => item.clothing_product_id === product.product_id);
        
        return (
          <ClothingDisplay product = {product} category = {category} subcategory={null} addItem={addItem} clothe={filteredClothes} />
        )
      }
      else {
        return (
          <ClothingDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem}/>
        )
      }
    }
    else {
      if (subcategory == null) {
        return (
          <ProductDisplay product = {product} category = {category} subcategory={null} addItem={addItem}/>
        )
      }
      else {
        return (
          <ProductDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem}/>
        )
      }
      
    }
  }

  if (categoryList !== null) {
    if (isNY == true) {
      return (
        <div className = "flex justify-between gap-10">

                <div className="grid grid-cols-6 gap-5">
                    {categoryList.map((category) => (
                      <div key = {category.category_id}>
                        <div className="border rounded-md flex items-center justify-center text-center text-xl bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                            <CategoryNY category = {category} />
                           
                        </div>
                        <DeleteButton item ={category} type={"Category"} />
                      </div>
                    ))}
                    <AddCategoryButton location={1} />
                </div>
                {/* <div class="border-8 border-sky-500 float-right h-96"></div> */}
                <Cart />
                

        </div>
      )
    }
    // is NJ
    else{
      return (
        <div className = "flex justify-between gap-10">

          
                <div className="grid grid-cols-6 gap-5">
                    {categoryList.map((category) => (
                      <div>
                        <div className="border rounded-md flex items-center justify-center text-center text-xl bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                            <CategoryNJ category = {category} />
                           
                        </div>
                        <DeleteButton item = {category} type ={"Category"} />
                      </div>
                    ))}
                    <AddCategoryButton location={0} />
                </div>
                {/* <div class="border-8 border-sky-500 float-right h-96"></div> */}
                <Cart />

        </div>
      )
    }
  }
  else if (subcategoryList !== null) {
    return (
        <div className = "flex justify-between gap-10">

            <div className="grid grid-cols-6 gap-5">
                  {subcategoryList.map((subcategory) => (
                    <div key ={subcategory.subcategory_id}>
                      <div className="border p-5 rounded-md items-center justify-center text-center text-xl font-bold bg-blue-100 hover:bg-blue-300" key={subcategory.subcategory_id} >
                          <SubCategoryNY subcategory = {subcategory} />
                          
                      </div>
                      <DeleteButton item ={subcategory} type ={"Subcategory"} />
                      </div>
                  ))}
                <AddSubCategoryButton category= {subMainCategory} />
            </div>
            <Cart />
        </div>
        
      
    )
  }
  else if (subcategory === null) {
    return (
      <div className = "flex justify-between gap-10">

        <div className="grid grid-cols-6 gap-5">
          {products.map((product) => (
                  <div className="h-1/2" key={product.product_id} >
                    <div className = "bg-white-600 rounded-2xl pl-2 pr-2 pt-2">
                      <div className="flex items-center justify-center pb-4 text-[25px]">
                        <Cloth product = {product} category = {category} subcategory={subcategory} addItem={addItem} clothingList={clothingList} />
                        {/* <ProductDisplay product = {product} category = {category} subcategory={null} addItem={addItem}/> */}
                      </div>
                      <DeleteButton item={product} type={"Product"} />
                    </div>
                    
                  </div>
              ))}
            <AddProductButton category={category} subcategory={null} />
          </div>
          <Cart /> 
      </div>

    )
  }
  else {
    return (
      <div className = "flex justify-between gap-10">

          <div className="grid grid-cols-6 gap-5">
            {products.map((product) => (
                    <div className="h-1/2" key={product.product_id}>
                      <div className = "bg-white-600 rounded-2xl pl-2 pr-2 pt-2">

                      <div className="flex items-center justify-center pb-4">
                        <Cloth product = {product} category = {category} subcategory={subcategory} addItem={addItem} />
                        {/* <ProductDisplay product = {product} category = {category} subcategory={subcategory} addItem={addItem}/> */}
                      </div>
                      <DeleteButton item ={product} type={"Product"} />
                    </div>
                    </div>
                ))}
            <AddProductButton category={category} subcategory={subcategory} />
          </div>
          <Cart /> 

        </div>
            
      )
  }
}

export default ProductPageMapping