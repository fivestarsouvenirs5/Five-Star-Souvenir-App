// import {useState} from 'react'
// import {useEffect} from 'react'
import prisma from './utils/prisma'
import React from 'react'
import Image from "next/image";

const fetchFeaturedProducts = async () => {
  try {
    const featuredProducts = await prisma.products.findMany({
      where: { featured_product: 1},
    });
    return featuredProducts;
  } catch (error) {
    // Handle error
    console.error("Error fetching featured products:", error);
    throw error; // Re-throw the error if needed
  }
}

const fetchCategories = async (id) => {
  let categories = await prisma.category.findUnique({
       where: {category_id: id}
   })
   return categories
 }

 const fetchSubcategories = async (id) => {
    const subcategories = await prisma.subcategories.findMany({
      where: { subcategory_id: id },
    })
    return subcategories
  }

const ImgSrc = async ({ product }) => {
  const cat = await fetchCategories(product.category_id);
  if (product.subcategory_id === null) {
    if (cat.category_location == 0) {
      return (
        <Image className="w-60"
              src={`/images/CATEGORIES/NJ/${encodeURIComponent(product.product_name)}.jpg`} 
              alt="My Image3"
              width={300}
              height={400}
              />
      )
    }
    else { // no subcategory, location is NY
      return (
      <Image className="w-60"
              src={`/images/CATEGORIES/${encodeURIComponent(cat.category)}/${encodeURIComponent(product.product_name)}.jpg`} 
              alt="My Image1"
              width={300}
              height={400}
              />
      )
    }
  }
  else { // subcategory_id is not null
    const subcat = await fetchSubcategories(product.subcategory_id);
    return (
      <Image className="w-60"
              src={`/images/CATEGORIES/${encodeURIComponent(cat.category)}/${encodeURIComponent(subcat[0].subcategory_name)}/${encodeURIComponent(product.product_name)}.jpg`} 
              alt="My Image2"
              width={300}
              height={400}
              />
    )
  }
  
}

export default async function Home() {
  // const [hydrated, setHydrated] = useState(false);
  const featuredProductsList = await fetchFeaturedProducts();

  const filteredCategoriesId = featuredProductsList.map(product => product.category_id);
  // const categories = await fetchCategories(featuredProductsList.map(((product) => product.category_id)));

  const categories = [];

  for (let i = 1; i < filteredCategoriesId.length; i++) {
      categories.push(await fetchCategories(i));
  }
  // console.log(categories[0].category);

  var index;
  
  // const filteredSubcategoriesId = featuredProductsList.map(product => product.subcategory_id);
  

  // map filteredcategories which is all the cateogry ids into fetchCategories and store that all in a list called categories 
  // and then from that list i would find the index of our current featureproduct in the featueredproduct list and take that 
  // index and find the matching positional value in the new cateogies list and bam our catogories name


  // useEffect(() => {
  //   // This forces a rerender, so the date is rendered
  //   // the second time but not the first
  //   setHydrated(true);
  // }, []);
  // if (!hydrated) {
  //   // Returns null on first render, so the client and server match
  //   return null;
  // }
  return (
    <main className="max-w-screen-xl mx-auto p-8 font-serif">
      {/* welcome blurb -> about us page */}
      
      <div className="mb-12 p-4 border border-red-500 rounded-md">
        <p className="text-xl">
          Five Star Souvenirs Inc. is a family-owned wholesale corporation known for its over 20 years of expertise in crafting and distributing unique, high-quality souvenirs featuring real images of New York City landmarks. With a commitment to eco-friendly materials and personalized customer relationships, the company sets itself apart by creating colorful, creative, and practical items.
        </p> 
        <hr className="my-2 border-black"/>
          
        <span className="mt-2 block">
          Read more in the <a href="/about-us" className="text-red-500 hover:underline">About Us page</a>!
        </span>
        
      </div>

      {/* products page*/}
      <div className="mb-4 text-xl">View our products in <a href="/products/new-york" className="text-red-500 hover:underline">our Products Page</a>!
      </div>


      {/* featured products*/}
      <div className="mb-8 p-4 border border-red-500 rounded-md bg-white">
        <h2 className="text-xl text-black mb-40">Featured Products</h2>
        {/* var featuredProductsList = await fetchFeaturedProducts(1); */}
        {/* You can add content inside this box if needed */}
        {featuredProductsList.map((featproduct) => (
                  <div className="h-1/2" key={featproduct.product_id} >
                    <div className = "bg-white-600 rounded-2xl pl-2 pr-2 pt-2">
                      <div className="flex items-center justify-center pb-4 text-[25px]">
                        {featproduct.product_name}
                        <ImgSrc product={featproduct} />
                        {/* <img src="/images/CATEGORIES/Ashtray Black/1.jpg" alt=""/> */}
                      </div>
                    </div>
                    
                  </div>
              ))}
      </div>

      {/* Contact us page*/}
      <div className="text-xl">
        If you are interested in any of our products, please contact Five Star Souvenirs through the <a href="/contact" className="text-red-500 hover:underline">Contact Page</a>  to discuss more details!
      </div>

    </main>
  );
}