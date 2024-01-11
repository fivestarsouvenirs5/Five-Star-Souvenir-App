'use client'
import React from 'react'
import Link from 'next/link'

// need to style
const CategoryNJ = ({ category }) => {

  return (
    <Link
      href={`/products/new-jersey/${category.category_id}`}
    >
      <h2>{category.category}</h2>
    </Link>
  )
}

export default CategoryNJ
