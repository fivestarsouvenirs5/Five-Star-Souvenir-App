// 'use client'
// import React from 'react'
// import Link from 'next/link'

// // need to style
// const CategoryNY = ({ category }) => {

//   return (
//     <Link
//       href={`/products/new-york/${category.category_id}`}
//     >
//       <h2>{category.category}</h2>
//     </Link>
//   )
// }

// export default CategoryNY

'use client'
import React from 'react';
import Link from 'next/link';
import { decode } from 'he'; // Importing decode function from he module

const CategoryNY = ({ category }) => {
  // Decode the category name
  const decodedCategoryName = decode(category.category);

  return (
    <Link
      href={`/products/new-york/${category.category_id}`}
    >
      {/* Render the decoded category name */}
      <h2>{decodedCategoryName}</h2>
    </Link>
  );
};

export default CategoryNY;
