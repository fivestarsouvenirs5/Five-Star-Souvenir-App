
'use client'
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import ProductPageMappingHelper from './productPageMappingHelper';
import ProductBreadCrumb from './productBreadCrumb';
import Link from "next/link";
import AddProductButton from './addProductButton';
import AddSubCategoryButton from "./addSubCategoryButton";
import AddCategoryButton from "./addCategoryButton";

const EditingButtons = ({
  isEditing,
  isAdmin,
  isNY,
  category,
  subcategory,
  subMainCategory,
  categoryList,
  subcategoryList,
}) => {
  if (!isEditing || !isAdmin) return null;

  const base =
    "px-3 py-1 rounded-md text-sm font-medium transition bg-gray-200 hover:bg-text-dark hover:text-white";

  // CATEGORY VIEW
  if (categoryList) {
    return (
      <div className="flex flex-wrap gap-2 ml-4">
        <AddCategoryButton location={isNY ? 1 : 0} admin={isAdmin} />
      </div>
    );
  }

  // SUBCATEGORY VIEW
  if (subcategoryList) {
    return (
      <div className="flex flex-wrap gap-2 ml-4">
        <AddSubCategoryButton category={subMainCategory} admin={isAdmin} />
      </div>
    );
  }

  // PRODUCT VIEW
  if (category) {
    return (
      <div className="flex flex-wrap gap-2 ml-4">
        <AddProductButton
          category={category}
          subcategory={subcategory ?? null}
          admin={isAdmin}
        />

        <AddSubCategoryButton category={category} admin={isAdmin} />
      </div>
    );
  }

  return null;
};

const ProductPageMapping = ({ products, categoryList, subcategoryList, isNY, category, subcategory, clothingList, subMainCategory, isAdmin, isApproved, stores }) => {

  const [isEditing, setIsEditing] = useState(false);


  return (
    <>
  <div className="min-h-screen px-2 sm:px-6 py-8 sm:py-10">

     <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-secondary-dark text-center">
        Products
      </h1>

      <div className="w-24 h-[2px] bg-secondary mb-6 rounded-full" />
    </div>

      <div className="flex items-center justify-between mb-4">

        {/* LEFT: Tabs */}
        <div className="flex gap-2">
          <Link
            href="/products/new-york"
            className={`
              px-4 py-2 rounded-md border transition
              ${isNY ? "bg-text-dark text-white" : "bg-white hover:bg-gray-100"}
            `}
          >
            New York
          </Link>

          <Link
            href="/products/new-jersey"
            className={`
              px-4 py-2 rounded-md border transition
              ${!isNY ? "bg-text-dark text-white" : "bg-white hover:bg-gray-100"}
            `}
          >
            New Jersey
          </Link>
        </div>
    {isAdmin && (
          <div className="flex items-center gap-2">
            <Label htmlFor="edit-mode" className="text-sm text-text">
              Editing Mode
            </Label>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="edit-mode"
                type="checkbox"
                checked={isEditing}
                onChange={(e) => setIsEditing(e.target.checked)}
                className="sr-only peer"
              />

              {/* Track */}
              <div className="
                w-11 h-6 bg-gray-300 rounded-full
                peer-checked:bg-text-dark
                transition-colors
              " />

              {/* Knob */}
              <div className="
                absolute left-0.5 top-0.5
                h-5 w-5 bg-white rounded-full
                transition-transform duration-200
                peer-checked:translate-x-5
              " />
            </label>
          </div>
        )}

      </div>
      <div className="flex flex-row w-full mt-2">
        <ProductBreadCrumb
          isNY={isNY}
          category={category}
          subcategory={subcategory}
        />

        {isAdmin && (
          <div className="ml-auto flex items-center gap-2">
            <EditingButtons
              isEditing={isEditing}
              isAdmin={isAdmin}
              isNY={isNY}
              category={category}
              subcategory={subcategory}
              subMainCategory={subMainCategory}
              categoryList={categoryList}
              subcategoryList={subcategoryList}
            />
          </div>
        )}
      </div>
      <ProductPageMappingHelper  products={products} categoryList={categoryList} subcategoryList={subcategoryList} isNY={isNY} category={category} subcategory={subcategory} clothingList={clothingList} subMainCategory={subMainCategory} isAdmin={isAdmin} isApproved={isApproved} stores={stores}  isEditing={isEditing}/>
    </div>
    </>
  )
}

export default ProductPageMapping
