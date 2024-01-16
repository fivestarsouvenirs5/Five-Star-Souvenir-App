import React from 'react'
import prisma from '../../../../utils/prisma'
import ProductDisplay from '../../../../components/productdisplay'
import Cart from '../../../../components/cart'


const fetchSubcategories = async (id) => {
    let subcategories = await prisma.subcategories.findUnique({
        where: {subcategory_id: id}
    })
    return subcategories
  }


const fetchProducts = async (id) => {
    const products = await prisma.products.findMany({
      where: { subcategory_id: id },
    })
    return products
  }


export default async function Subcategory({ params }) {
  // console.log(params)
    const id = Number(
        Array.isArray(params?.id)
          ? params?.subcategory_id[ 0 ]
          : params?.subcategory_id,
      )
    console.log(id)

    const products = await fetchProducts(id);
    // console.log(products);

    const subcategory = await fetchSubcategories(id);

    return (
      <main>
        <h2 className="text-center py-5 lg:text-4xl font-bold">{subcategory.subcategory_name}</h2>
        <div className="flex justify-between">
            {/* side bar */}
            <div className="grid grid-cols-1 gap-5 h-4/6">
                <div className="flex flex-wrap border-black justify-items-start gap-2 w-3/4">
                    <a href="/products/new-york" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-300 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New York</a>
                    <a href="/products/new-jersey" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-100 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New Jersey</a>
                </div>
            </div>

            
            
            <div className = "flex justify-between gap-10">

                <div className="grid grid-cols-6 gap-5">
                  {products.map((product) => (
                          <div className="h-1/2" key={product.product_id}>
                              <ProductDisplay product = {product} category = {category}/>
                          </div>
                      ))}
                  </div>
            </div>
            <Cart />
        </div>
    </main>
    )
}