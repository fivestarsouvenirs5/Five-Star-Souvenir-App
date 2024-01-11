'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import Link from 'next/link'

// need to style
const ProductDisplay = ({ product }) => {
   const [openModal, setOpenModal] = useState(false);
  return (
     
     <>
      <Button onClick={() => setOpenModal(true)}>{product.product_name}</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Product Info: {product.product_name}</Modal.Header>
        <Modal.Body>
          <h2>img</h2>
          <h2>Product Name: {product.product_name}</h2>
          {/* figure out how to get actual category name to display here */}
          <h2>Category: {product.category_id}</h2>
          {/* probably make it a component cause you need to check if in or out */}
          <h2>In Stock/Out of Stock</h2>
          <form>
            {/* need to make this a pick list (also prob component cause need to access sizes too) */}
            <h2>Select a size:</h2>
            <h2>Qty:</h2>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Add to Cart</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDisplay