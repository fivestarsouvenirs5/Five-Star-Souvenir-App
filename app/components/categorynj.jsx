

'use client'
import React from 'react';
import Image from 'next/image';
import { decode } from 'he';

const CategoryNJ = ({ category }) => {

  const decodedCategoryID = decode(String(category.category_id || ''));

  const ImgSrc = () => {
    if (category.image_id) {
      const decodedCategoryImage = decode(String(category.image_id));
      return (
  
          <Image
            className="w-60"
            src={decodedCategoryImage}
            alt="Category Image"
            width={500}
            height={500}
          />
     
      );
    } else {
      return (
          <Image
            src={`/images/CATEGORY_NAMES/NJ/${encodeURIComponent(decodedCategoryID)}.jpg`}
            alt="Category Image"
            width={500}
                height={500}
          />
      
      );
    }
  };

  return (
    <a href={`/products/new-jersey/${category.category_id || ''}`}>
      <ImgSrc />
    </a>
  );
};

export default CategoryNJ;
