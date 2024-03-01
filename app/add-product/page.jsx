'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import fetch from 'node-fetch'

const AddProductForm = () => {
  const [ product_name, setProduct_name ] = useState('')
  const router = useRouter()

  const submitData = async (e) => {
    e.preventDefault()
    try {
      console.log(product_name)
      const body = {product_name}
      console.log(body)
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      router.push('/logged-in')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <form onSubmit={submitData}>
          <h1 class="text-blue-600">Add product</h1>
          <input
            autoFocus
            onChange={(e) => setProduct_name(e.target.value)}
            placeholder="product name"
            type="text"
            value={product_name}
          /> 
          <input class="bg-green-200"
            disabled={!product_name}
            type="submit"
            value="Create"
            />
        </form>
      </div>
    </>
  )
}

export default AddProductForm