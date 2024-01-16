'use client'
import React from 'react'
import Link from 'next/link'

// need to style
const SubCategoryNY = ({ subcategory }) => {

  return (
    <Link
      href={`/products/new-york/sub/${subcategory.subcategory_id}`}
    >
      <h2>{subcategory.subcategory_name}</h2>
    </Link>
  )
}

export default SubCategoryNY
