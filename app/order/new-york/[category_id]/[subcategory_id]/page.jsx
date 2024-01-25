import React from 'react'
import prisma from '../../../../utils/prisma'
import ProductDisplay from '../../../../components/productdisplay'
import Cart from '../../../../components/cart'


const fetchCategories = async (id) => {
    let categories = await prisma.category.findUnique({
        where: {category_id: id}
    })
    return categories
  }


const fetchProducts = async (id) => {
    const products = await prisma.products.findMany({
      where: { subcategory_id: id },
    })
    return products
  }


export default async function Subcategory({ params }) {
    const id = Number(
        Array.isArray(params?.id)
          ? params?.category_id[ 0 ]
          : params?.category_id,
      )
    console.log(id)

    const products = await fetchProducts(id);
    // console.log(products);

    const category = await fetchCategories(id);

    return (
      <main>
        <h2 className="text-red-600">{category.category}</h2>
        <div className = "px-20 py-10 flex justify-between gap-10">

       <div className="grid grid-cols-6 gap-5">
        {products.map((product) => (
                <div className="border p-5 rounded-md text-center bg-gray-100 hover:bg-gray-300" key={product.product_id}>
                    <ProductDisplay product = {product} />
                </div>
            ))}
        </div>
            <Cart />
        </div>
    </main>
    )
}