import React from 'react'
import { notFound, } from 'next/navigation'
import prisma from '../../../utils/prisma'
import SubCategoryNY from '../../../components/subcategoryny'
import ProductDisplay from '../../../components/productdisplay'

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
const subcategories = await fetchSubcategories(id);
  console.log(subcategories)

  if (subcategories === undefined || subcategories.length == 0) {
    const products = await fetchProducts(id);
    console.log(products);
    return (
      <main>
        <h2 className="text-red-600">Products</h2>
        {products.map((product) => (
                <div key={product.product_id} >
                    <ProductDisplay product = {product} />
                </div>
            ))}
    </main>
    )
  }

else {
  return (
    <main>
        <h2 className="text-red-600">Subcategories</h2>
            {subcategories.map((subcategory) => (
                <div key={subcategory.subcategory_id} >
                    <SubCategoryNY subcategory = {subcategory} />
                </div>
            ))}
    </main>
  )
}


  
}

