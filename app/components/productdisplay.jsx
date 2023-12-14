'use client'
import React from 'react'
import Link from 'next/link'

// need to style
const ProductDisplay = ({ product }) => {

  return (
    <h2>{product.product_name}</h2>
  )
}

export default ProductDisplay