'use client'
import {useState} from 'react'
import {useEffect} from 'react'

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <main className="max-w-screen-xl mx-auto p-8 font-serif">
      {/* welcome blurb -> about us page */}
      
      <div className="mb-12 p-4 border border-red-500 rounded-md">
        <p className="text-xl">
        Five Star Souvenirs Inc. is a family-owned wholesale corporation known for its over 20 years of expertise in crafting and distributing unique, high-quality souvenirs featuring real images of New York City landmarks. With a commitment to eco-friendly materials and personalized customer relationships, the company sets itself apart by creating colorful, creative, and practical items.
                  <hr className="my-2 border-black"/>
          
          <span className="mt-2 block">
            Read more in the <a href="/about-us" className="text-red-500 hover:underline">About Us page</a>!
          </span>
        </p>
      </div>

      {/* products page*/}
      <div className="mb-4 text-xl">
      View our products in <a href="/products/new-york" className="text-red-500 hover:underline">our Products Page</a>!
      </div>


      {/* featured products*/}
      <div className="mb-8 p-4 border border-red-500 rounded-md bg-white">
        <h2 className="text-xl text-black mb-40">Featured Products</h2>
        {/* You can add content inside this box if needed */}
      </div>

      {/* Contact us page*/}
      <div className="text-xl">
        If you are interested in any of our products, please contact Five Star Souvenirs through the <a href="/contact" className="text-red-500 hover:underline">Contact Page</a>  to discuss more details!
      </div>

    </main>
  );
}