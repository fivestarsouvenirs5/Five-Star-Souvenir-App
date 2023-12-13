'use client'
import React from 'react'
import Link from 'next/link'

// need to style
const CategoryNY = ({ category }) => {

  return (
    <Link
      href={`/order/new-york/${category.category_id}`}
    >
      <h2>{category.category}</h2>
    </Link>
  )
}

export default Category
