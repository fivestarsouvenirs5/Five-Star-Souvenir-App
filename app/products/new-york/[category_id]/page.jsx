import React from 'react'
import prisma from '../../../utils/prisma'
import ProductPageMapping from '../../../components/productPageMapping'

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

const fetchClothing = async (id) => {
  const clothes = await prisma.clothing_product_size.findMany({
    where: {category_id: id},
    // NEED TO CHANGE OBV i think itd be best to add a column to the clothing_product_size table that gives the products cateogry id so that
    // here we can just say where: {category_id: id} so it can find it better
    // but idk if adding a column to the table will mess up the database stuff so i shall just leave this for now
  })
  return clothes
}

export default async function NYCategoryPage({ params }) {
  const id = Number(
    Array.isArray(params?.id)
      ? params?.category_id[ 0 ]
      : params?.category_id,
  )
const category = await fetchCategories(id);

const subcategories = await fetchSubcategories(id);

  if (subcategories === undefined || subcategories.length == 0) {
    const products = await fetchProducts(id);
    const clothing = await fetchClothing(id);
    return (
      <main>
        <h2 className="text-center py-5 lg:text-4xl font-bold">{category.category}</h2>
        <div className="flex justify-between">
            {/* side bar */}
            <div className="grid grid-cols-1 gap-5 h-4/6">
                <div className="flex flex-wrap border-black justify-items-start gap-2 w-3/4">
                    <a href="/products/new-york" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-300 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New York</a>
                    <a href="/products/new-jersey" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-100 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New Jersey</a>
                </div>
            </div>

            <ProductPageMapping products={products} categoryList={null} subcategoryList={null} isNY={true} category={category} subcategory={null} clothingList={clothing} subMainCategory={null}/>
            

        </div>    
    </main>
    )
  }

else {
  const clothing = await fetchClothing(id);
  return (
    <main>
      
      <h2 className="text-center py-5 lg:text-4xl font-bold">{category.category}</h2>
      <div className="flex justify-between">
            {/* side bar */}
            <div className="grid grid-cols-1 gap-5 h-4/6">
                <div className="flex flex-wrap border-black justify-items-start gap-2 w-3/4">
                    <a href="/products/new-york" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-300 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New York</a>
                    <a href="/products/new-jersey" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-100 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New Jersey</a>
                </div>
            </div>

            <ProductPageMapping products={null} categoryList={null} subcategoryList={subcategories} isNY={true} category={null} subcategory={null} clothingList={clothing} subMainCategory={category}/>
            

        </div>
    </main>
  )
}


  
}

