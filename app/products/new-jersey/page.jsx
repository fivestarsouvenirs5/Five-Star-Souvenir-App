"use client";

import { useEffect, useState } from "react";
import ProductPageMapping from "../../components/productsPage/productPageMapping";
import { useMyUser } from "../../context/userContext";

async function fetchCategory() {
  const res = await fetch(`/api/getCategory?id=36`);
  return res.ok ? res.json() : null;
}

async function fetchProducts() {
  const res = await fetch(`/api/getProductsByCategory?id=36`);
  return res.ok ? res.json() : [];
}

async function fetchClothing() {
  const res = await fetch(`/api/getClothingByCategory?id=36`);
  return res.ok ? res.json() : [];
}

export default function NJProductsPage() {
  const { myUser, isSignedIn, myStores } = useMyUser();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const [cat, prods, cloth] = await Promise.all([
        fetchCategory(),
        fetchProducts(),
        fetchClothing(),
      ]);

      setCategory(cat);
      setProducts(prods);
      setClothing(cloth);

      setLoading(false);
    }

    load();
  }, []);

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
          isNY={false}
          category={category}
          subcategory={null}
          subMainCategory={null}
          isAdmin={!!myUser?.app_metadata?.admin}
          isApproved={isSignedIn}
          stores={myStores}
          clothingList={clothing}
        />
      )}
    </main>
  );
}