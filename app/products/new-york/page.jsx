"use client";

import { useEffect, useState } from "react";
import ProductPageMapping from "../../components/productsPage/productPageMapping";
import { useMyUser } from "../../context/userContext";

const fetchCategories = async () => {
  const res = await fetch("/api/getNYCategories");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export default function OrderNY() {
  const {
    myUser,
    isSignedIn,
    myStores,
    setMyStores,
  } = useMyUser();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
        setLoading(true);
      const cats = await fetchCategories();
      setCategories(cats);
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
          products={[]}
          categoryList={categories}
          subcategoryList={null}
          isNY={true}
          category={null}
        subcategory={null}
        subMainCategory={null}
        isAdmin={!!myUser?.app_metadata?.admin}
        isApproved={isSignedIn}
        stores={myStores}
      />)}

      
    </main>
  );
}