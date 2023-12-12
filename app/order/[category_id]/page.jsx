import React from 'react'
import { notFound, } from 'next/navigation'
import prisma from '../../utils/prisma'
import Category from '../../components/category'

export default async function CategoryPage({ params }) {
  const id = Number(
    Array.isArray(params?.id)
      ? params?.id[ 0 ]
      : params?.id,
  )

//   console.log(prisma)
  const subcategories = await prisma.subcategories.findMany({
    where: { catg_id : id },
  })


  return (
    <main>
        <h2 class="text-red-600">Subcategories</h2>
            {subcategories.map((subcategory) => (
                <div key={subcategory.subcategory_id} >
                    <Category category = {subcategory} />
                </div>
            ))}
    </main>
  )
}

