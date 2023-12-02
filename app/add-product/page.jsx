'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const AddProductForm = () => {
  const [ product_name, setProductName ] = useState('')
  const router = useRouter()

  const submitData = async (e) => {
    e.preventDefault()
    try {
      const body = {product_name}
      console.log(body)
      await fetch(`/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      console.log()

      router.push('/logged-in')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <form onSubmit={submitData}>
          <h1>Add product</h1>
          <input
            autoFocus
            onChange={(e) => setProductName(e.target.value)}
            placeholder="product name"
            type="text"
            value={product_name}
          />
          <input
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