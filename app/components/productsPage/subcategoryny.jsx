
'use client'
import React from 'react';
import Link from 'next/link';
import { decode } from 'he'; // Importing decode function from he module

const SubCategoryNY = ({ subcategory }) => {
  const decodedSubcategoryName = decode(subcategory.subcategory_name); // Decoding subcategory name
  return (
    <Link href={`/products/new-york/sub/${subcategory.subcategory_id}`}>
      <h2>{decodedSubcategoryName}</h2> {/* Displaying decoded subcategory name */}
    </Link>
  )
}

export default SubCategoryNY;
