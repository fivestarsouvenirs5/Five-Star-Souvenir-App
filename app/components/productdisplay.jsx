'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import ProductDetails from './productDetails';
import Link from 'next/link'

// need to style
const ProductDisplay = ({ product, category }) => {
   const [openModal, setOpenModal] = useState(false);

  //  function hasSize() {
  //     if (product.clothing_size_id)
  //  }
  return (
     
     <>
      <Button onClick={() => setOpenModal(true)}>{product.product_name}</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Product Info: {product.product_name}</Modal.Header>
        <Modal.Body>
          <ProductDetails product={product} category={category}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Add to Cart</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDisplay