import React from 'react'
import prisma from '../../../../utils/prisma'
import ProductDisplay from '../../../../components/productdisplay'

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