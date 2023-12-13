import React from 'react'
import { notFound, } from 'next/navigation'
import prisma from '../../../utils/prisma'
import SubCategoryNY from '../../../components/subcategoryny'

export default async function NYCategoryPage({ params }) {
  const id = Number(
    Array.isArray(params?.id)
      ? params?.category_id[ 0 ]
      : params?.category_id,
  )
console.log(id)
   //console.log(prisma)
  const subcategories = await prisma.subcategories.findMany({
    where: { catg_id: id },
  })

  console.log(subcategories)


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
