"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductPageMapping from "../../../components/productsPage/productPageMapping";
import { useMyUser } from "../../../context/userContext";

async function fetchCategory(id) {
  const res = await fetch(`/api/getCategory?id=${id}`);
  return res.ok ? res.json() : null;
}

async function fetchSubcategories(id) {
  const res = await fetch(`/api/getSubcategoriesByCategory?id=${id}`);
  return res.ok ? res.json() : [];
}

async function fetchProducts(id) {
  const res = await fetch(`/api/getProductsByCategory?id=${id}`);
  return res.ok ? res.json() : [];
}

async function fetchClothing(id) {
  const res = await fetch(`/api/getClothingByCategory?id=${id}`);
  return res.ok ? res.json() : [];
}

export default function NYCategoryPage() {
  const { category_id } = useParams();
  const id = Number(category_id);

  const { myUser, isSignedIn, myStores } = useMyUser();

  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [clothing, setClothing] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function load() {
      setLoading(true);

      const cat = await fetchCategory(id);
      const subs = await fetchSubcategories(id);

      setCategory(cat);
      setSubcategories(subs);

      if (!subs || subs.length === 0) {
        const prods = await fetchProducts(id);
        const cloth = await fetchClothing(id);

        setProducts(prods);
        setClothing(cloth);
      } else {
        const cloth = await fetchClothing(id);
        setClothing(cloth);
      }

      setLoading(false);
    }

    load();
  }, [id]);

    const isProductView = !subcategories || subcategories.length === 0;

  return (
    <main>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center pt-8 sm:pt-10">
      <h1 className="text-4xl font-bold mb-4 text-secondary-dark text-center">
        Products
      </h1>

      <div className="w-24 h-[2px] bg-secondary mb-6 rounded-full" />
    </div>

      {loading ? <p className="p-2 text-lg">Loading...</p> : (
        <ProductPageMapping
          products={isProductView ? products : null}
          categoryList={null}
          subcategoryList={isProductView ? null : subcategories}
          isNY={true}
          category={isProductView ? category : null}
          subcategory={null}
          clothingList={clothing}
          subMainCategory={isProductView ? null : category}
          isAdmin={!!myUser?.app_metadata?.admin}
          isApproved={isSignedIn}
          stores={myStores}
        />)}
    </main>
  );
}