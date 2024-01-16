import React from 'react'
import { notFound, } from 'next/navigation'
import prisma from '../../../utils/prisma'
import ProductDisplay from '../../../components/productdisplay'
import Cart from '../../../components/cart'

const fetchCategories = async (id) => {
    let categories = await prisma.category.findUnique({
        where: {category_id: id}
    })
    return categories
  }

const fetchProducts = async (id) => {
    const products = await prisma.products.findMany({
      where: { category_id: id },
    })
    return products
  }


export default async function NJProductsPage({ params }) {
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
        <h2 className="text-center py-5 lg:text-4xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(200,0,0,0.8]">{category.category}</h2>
        <div className="flex justify-between">
            {/* side bar */}
            <div className="grid grid-cols-1 gap-5 h-4/6">
                <div className="flex flex-wrap border-black justify-items-start gap-2 w-3/4">
                    <a href="/products/new-york" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-100 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New York</a>
                    <a href="/products/new-jersey" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-300 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New Jersey</a>
                </div>
            </div>

            
            
            <div className = "flex justify-between gap-10">

                  <div className="grid grid-cols-6 gap-5">
                    {products.map((product) => (
                            <div className="h-1/2" key={product.product_id} >
                                <ProductDisplay product = {product} category = {category} />
                            </div>
                        ))}
                  </div>
            </div>
            <Cart />

       </div>
    </main>
    )
}