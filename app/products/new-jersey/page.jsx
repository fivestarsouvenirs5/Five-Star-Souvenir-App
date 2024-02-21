import React from 'react'
import prisma from '../../utils/prisma'
import ProductPageMapping from '../../components/productPageMapping'

const fetchCategories = async () => {
    let categories = await prisma.category.findUnique({
        where: {category_id: 36}
    })
    return categories
  }

const fetchProducts = async () => {
    const products = await prisma.products.findMany({
      where: { category_id: 36 },
    })
    return products
  }


export default async function NJProductsPage() {
    // const id = Number(
    //     Array.isArray(params?.id)
    //       ? params?.category_id[ 0 ]
    //       : params?.category_id,
    //   )
    // console.log(id)

    const products = await fetchProducts();
    // console.log(products);

    const category = await fetchCategories();

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

            <ProductPageMapping products={products} categoryList={null} subcategoryList={null} isNY={false} category={category} subcategory={null} subMainCategory={null} />

       </div>
    </main>
    )
}