'use client'
import React from 'react'
import Link from 'next/link'

// need to style
const Category = ({ category }) => {

  return (
    <Link
      href={`/order/${category.category_id}`}
    >
      <h2>{category.category}</h2>
    </Link>
  )
}

export default Category
