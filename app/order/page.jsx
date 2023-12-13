// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css'
import Link from 'next/link'
import prisma from '../utils/prisma'
import Category from '../components/category'
//import AddProductForm from '../components/addProductForm'

const fetchCategories = async () => {
    let categories = await prisma.category.findMany()
    return categories
}

//import useSWR from 'swr'
//import { useState } from 'react';

// const fetcher = url => fetch(url).then(res => res.json())
export default async function Order() {
    const categories = await fetchCategories()

    console.log({categories})
//     const { data, error } = useSWR('/api/products', fetcher)
//   if (error) return <div>error {error}</div>
//   if (!data) return <div>Loading ...</div>
  return (
    <main>
        <h2 class="text-red-600">Categories</h2>
            {categories.map((category) => (
                <div key={category.category_id} >
                    <Category category = {category} />
                </div>
            ))}
        <div>
            
        </div>
        

    </main>
)
}