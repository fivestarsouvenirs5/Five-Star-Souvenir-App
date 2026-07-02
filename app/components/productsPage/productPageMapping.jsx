
'use client'
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import ProductPageMappingHelper from './productPageMappingHelper';
import ProductBreadCrumb from './productBreadCrumb';
import AddProductButton from './addProductButton';
import AddSubCategoryButton from "./addSubCategoryButton";
import AddCategoryButton from "./addCategoryButton";
import { useShoppingCart } from 'use-shopping-cart';
import { toast } from 'sonner';
import { useMyUser } from "../../context/userContext";

const ImgSrc = (category, subcategory, product) => {
  if (product.image_id) {
    return product.image_id;
  }

  if (!subcategory) {
    if (category.category_location == 0) {
      return `/images/CATEGORIES/NJ/${encodeURIComponent(product.product_name)}.jpg`;
    }

    return `/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(product.product_name)}.jpg`;
  }

  return `/images/CATEGORIES/${encodeURIComponent(category.category)}/${encodeURIComponent(subcategory.subcategory_name)}/${encodeURIComponent(product.product_name)}.jpg`;
};

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

const AddAllToCartButton = ({ cartCount, products, category, subcategory, isApproved, addItem }) => {
   if (!Array.isArray(products) || products.length === 0) return null;
      if (products.length > 0) {
        if (products[0].clothing_size_id !== 1 && isApproved) {
          return(
              <div >
                    <button
                      onClick={() => {
                        let totalAdded = 0;
                        Object.entries(products).forEach(([productId, product]) => {
                          if (document.getElementById(`qty-${product.product_id}`).value > 0) {
                            const quantity = parseInt(document.getElementById(`qty-${product.product_id}`).value, 10);
                        
                              const cartDisplayProduct = {
                                name: product.product_name,
                                id: category.category + '_' + product.product_name,
                                price: product.price,
                                currency: 'USD',
                              };
                              addItem(cartDisplayProduct, {count: quantity, product_metadata: {location: category.category_location, cell: product.order_form_cell,product_qty: product.set_qty, category: category.category, subcategory: subcategory ? subcategory.subcategory_name : null, image_url: ImgSrc(category, subcategory, product)}});
                              totalAdded += quantity;
                              }
                          
                        });
                        toast.success( `${totalAdded} item(s) added. Total items: ${cartCount + totalAdded}`, {
                          className: "!bg-neutral-beige-light !text-text-dark",
                          duration: 5000,
                        });
                      }}
                      className="bg-primary hover:bg-primary-light text-white hover:text-text-dark font-medium px-4 py-1 rounded-md"
                    >
                      Add All to Cart
                    </button>
                  </div>
          )
        }
    }
  }

const ProductPageMapping = ({ products, categoryList, subcategoryList, isNY, category, subcategory, clothingList, subMainCategory, isAdmin, isApproved, stores }) => {
  const cart = useShoppingCart();
  const [isEditing, setIsEditing] = useState(false);
  const { addItem, formattedTotalPrice, cartCount } = cart;
  const {isSignedIn, myUser} = useMyUser();


  return (
      <div className="min-h-screen px-2 sm:px-6">
        
        {/* TOP BAR */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">

          {/* Tabs */}
          <div className="flex w-full sm:w-auto gap-2">
            <a
              href="/products/new-york"
              className={`
                flex-1 sm:flex-none text-center px-4 py-2 rounded-md border transition
                ${isNY ? "bg-text-dark text-white" : "bg-white hover:bg-gray-100"}
              `}
            >
              New York
            </a>

            <a
              href="/products/new-jersey"
              className={`
                flex-1 sm:flex-none text-center px-4 py-2 rounded-md border transition
                ${!isNY ? "bg-text-dark text-white" : "bg-white hover:bg-gray-100"}
              `}
            >
              New Jersey
            </a>
          </div>

          {/* Admin toggle */}
          {isAdmin && (
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
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

                <div className="
                  w-11 h-6 bg-gray-300 rounded-full
                  peer-checked:bg-text-dark
                  transition-colors
                " />

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

        {/* SECOND ROW (Breadcrumb + Actions) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 w-full">

          {/* Breadcrumb */}
          <div className="w-full sm:w-auto">
            <ProductBreadCrumb
              isNY={isNY}
              category={category}
              subcategory={subcategory}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:ml-auto w-full sm:w-auto">

            {isAdmin && (
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
            )}

            {isSignedIn && (
              <AddAllToCartButton
                cartCount={cartCount}
                products={products}
                category={category}
                subcategory={subcategory}
                isApproved={isApproved}
                addItem={addItem}
              />
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-3">
          <ProductPageMappingHelper
            products={products}
            categoryList={categoryList}
            subcategoryList={subcategoryList}
            isNY={isNY}
            category={category}
            subcategory={subcategory}
            clothingList={clothingList}
            subMainCategory={subMainCategory}
            isAdmin={isAdmin}
            isApproved={isApproved}
            stores={stores}
            isEditing={isEditing}
          />
        </div>

      </div>
    );
}

export default ProductPageMapping
