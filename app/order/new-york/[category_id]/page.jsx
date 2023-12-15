import React from 'react'
import { notFound, } from 'next/navigation'
import prisma from '../../../utils/prisma'
import SubCategoryNY from '../../../components/subcategoryny'
import ProductDisplay from '../../../components/productdisplay'
import Cart from '../../../components/cart'

const fetchCategories = async (id) => {
  let categories = await prisma.category.findUnique({
      where: {category_id: id}
  })
  return categories
}

const fetchSubcategories = async (id) => {
  const subcategories = await prisma.subcategories.findMany({
    where: { catg_id: id },
  })
  return subcategories
}

const fetchProducts = async (id) => {
  const products = await prisma.products.findMany({
    where: { category_id: id },
  })
  return products
}

export default async function NYCategoryPage({ params }) {
  const id = Number(
    Array.isArray(params?.id)
      ? params?.category_id[ 0 ]
      : params?.category_id,
  )
console.log(id)
   //console.log(prisma)
const category = await fetchCategories(id);
// console.log(category.category);

const subcategories = await fetchSubcategories(id);
  // console.log(subcategories)

  if (subcategories === undefined || subcategories.length == 0) {
    const products = await fetchProducts(id);
    // console.log(products);
    return (
      <main>
        <h2 className="text-red-600">{category.category}</h2>
        <div className = "px-20 py-10 flex justify-between gap-10">

       <div className="grid grid-cols-6 gap-5">
        {products.map((product) => (
                <div className="border p-5 rounded-md text-center bg-gray-100 hover:bg-gray-300" key={product.product_id} >
                    <ProductDisplay product = {product} />
                </div>
            ))}
        </div>
        <Cart /> 

        </div>    
    </main>
    )
  }

else {
  return (
    <main>
      
      <h2 className="text-red-600">{category.category}</h2>
       <div className = "px-20 py-10 flex justify-between gap-10">

       <div className="grid grid-cols-6 gap-5">
            {subcategories.map((subcategory) => (
                <div className="border p-5 rounded-md items-center justify-center text-center text-xl font-bold bg-blue-100 hover:bg-blue-300" key={subcategory.subcategory_id} >
                    <SubCategoryNY subcategory = {subcategory} />
                </div>
            ))}
        </div>
        <Cart />

        </div>
    </main>
  )
}


  
}

