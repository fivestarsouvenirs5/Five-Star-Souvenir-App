"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductPageMapping from "../../../../components/productsPage/productPageMapping";
import { useMyUser } from "../../../../context/userContext";

async function fetchProducts(id) {
  const res = await fetch(`/api/getProductsBySubcategory?id=${id}`);
  return res.ok ? res.json() : [];
}

async function fetchSubcategory(id) {
  const res = await fetch(`/api/getSubcategory?id=${id}`);
  return res.ok ? res.json() : null;
}

async function fetchCategory(id) {
  const res = await fetch(`/api/getCategory?id=${id}`);
  return res.ok ? res.json() : null;
}

export default function SubcategoryPage() {
  const { subcategory_id } = useParams();
  const id = Number(subcategory_id);

  const { myUser, isSignedIn, myStores } = useMyUser();

  const [products, setProducts] = useState([]);
  const [subcategory, setSubcategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function load() {
      setLoading(true);

      const sub = await fetchSubcategory(id);
      const prods = await fetchProducts(id);

      setSubcategory(sub);
      setProducts(prods);

      if (sub?.catg_id) {
        const cat = await fetchCategory(sub.catg_id);
        setCategory(cat);
      }

      setLoading(false);
    }

    load();
  }, [id]);

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
          products={products}
          categoryList={null}
          subcategoryList={null}
          isNY={true}
          category={category}
          subcategory={subcategory}
          subMainCategory={null}
          isAdmin={!!myUser?.app_metadata?.admin}
          isApproved={isSignedIn}
          stores={myStores}
        />
      )}
    </main>
  );
}