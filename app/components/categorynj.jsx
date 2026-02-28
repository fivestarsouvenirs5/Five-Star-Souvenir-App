// 'use client'
// import React from 'react'
// import Link from 'next/link'

// // need to style
// const CategoryNJ = ({ category }) => {

//   return (
//     <Link
//       href={`/products/new-jersey/${category.category_id}`}
//     >
//       <h2>{category.category}</h2>
//     </Link>
//   )
// }

// export default CategoryNJ

'use client'
import React from 'react';
import Link from 'next/link';
import { decode } from 'he'; // Importing decode function from he module

const CategoryNJ = ({ category }) => {
  // Decode the category name
  const decodedCategoryName = decode(category.category);

  return (
    <Link
      href={`/products/new-jersey/${category.category_id}`}
    >
      {/* Render the decoded category name */}
      <h2>{decodedCategoryName}</h2>
    </Link>
  );
};

export default CategoryNJ;

// 'use client'
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { decode } from 'he';

// const CategoryNJ = ({ category }) => {

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
//             src={`/images/CATEGORY_NAMES/NJ/${encodeURIComponent(decodedCategoryID)}.jpg`}
//             alt="Category Image"
//             width={500}
//                 height={500}
//           />
      
//       );
//     }
//   };

//   return (
//     <Link href={`/products/new-jersey/${category.category_id || ''}`}>
//       <ImgSrc />
//     </Link>
//   );
// };

// export default CategoryNJ;
