
'use client'
import React from 'react';
import { decode } from 'he'; // Importing decode function from he module

const SubCategoryNY = ({ subcategory }) => {
  const decodedSubcategoryName = decode(subcategory.subcategory_name); // Decoding subcategory name
  return (
    <a href={`/products/new-york/sub/${subcategory.subcategory_id}`}>
      <h2>{decodedSubcategoryName}</h2> {/* Displaying decoded subcategory name */}
    </a>
  )
}

export default SubCategoryNY;
