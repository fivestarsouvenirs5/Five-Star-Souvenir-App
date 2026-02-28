'use client'
import React from 'react'
import Link from 'next/link'

// need to style
const CategoryNY = ({ category }) => {

  return (
    <Link
      href={`/products/new-york/${category.category_id}`}
    >
      <h2>{category.category}</h2>
    </Link>
  )
}

export default CategoryNY

// 'use client'
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { decode } from 'he';

// const CategoryNY = ({ category }) => {

//   const decodedCategoryID = decode(String(category.category_id || ''));

//   const ImgSrc = () => {
//     if (category.image_id) {
//       const decodedCategoryImage = decode(String(category.image_id));
//       return (
  
//           <Image
//             className="w-60"
//             src={decodedCategoryImage}
//             alt="Category Image"
//             width={500}
//             height={500}
//           />
     
//       );
//     } else {
//       return (
//           <Image
//             src={`/images/CATEGORY_NAMES/NY/${encodeURIComponent(decodedCategoryID)}.jpg`}
//             alt="Category Image"
//             width={500}
//                 height={500}
//           />
      
//       );
//     }
//   };

//   return (
//     <Link href={`/products/new-york/${category.category_id || ''}`}>
//       <ImgSrc />
//     </Link>
//   );
// };

// export default CategoryNY;