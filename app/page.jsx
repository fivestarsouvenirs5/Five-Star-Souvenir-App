// import {useState} from 'react'
// import {useEffect} from 'react'
import prisma from './utils/prisma'
import React from 'react'
import Image from "next/image";
import { getSession } from '@auth0/nextjs-auth0';
import Link from "next/link";
import EditDeliveryButton from './components/editDeliveryButton';


async function getAppMetadata(email) {
    var axios = require("axios").default;
    try {
        var getAccess = {
            method: 'POST',
            url: 'https://' + process.env.AUTH0_DOMAIN + '/oauth/token',
            headers: {'content-type': 'application/json'},
            data: {
                grant_type: 'client_credentials',
                client_id: process.env.AUTH0_API_CLIENT_ID,
                client_secret: process.env.AUTH0_API_CLIENT_SECRET,
                audience: process.env.AUTH0_API_ID 
            }
        };
    
        // console.log("Made it!");
        // console.log(getAccess);
    
        let apiKeyInformation = [];
        await axios.request(getAccess).then(function (response) {
            apiKeyInformation = response.data;
            //console.log(apiKeyInformation)
        }).catch(function (error) {
            console.error(error);
        })
    
        var options = {
            method: 'GET',
            url: 'https://dev-k7q6c31x25d0h3f6.us.auth0.com/api/v2/users-by-email',
            params: {email: email},
            headers: {authorization: 'Bearer ' + apiKeyInformation.access_token}
        };
    
            const headers = {
                'Content-Type': 'application/json',
            };
    
            let user = [];
            await axios.request(options).then(function (response) {
                //console.log(response.data);
                user = response.data;
            }).catch(function (error) {
                console.error(error);
            });
            return user[0]
    } catch (err){
        // console.log("getting metadata error", err);
    }
  }

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
  if (product.image_id) {
    return (
      <Image className="w-60" src={product.image_id} alt="Product Image" width={300} height={400} />
    )
  }
  else {
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
  
}

const fetchDate = async () => {
  try {
    const myDate = await prisma.delivery_date.findUnique({
      where: { delivery_id: 1},
    });
    return myDate;
  } catch (error) {
    // Handle error
    console.error("Error fetching delivery date:", error);
    throw error; // Re-throw the error if needed
  }
}

const DeliveryDate = async () => {
  const session = await getSession();
  const date = await fetchDate();
  
    
    if (session) {
        const myUser = await getAppMetadata(session.user.email);
        if (myUser.app_metadata.admin == true) {
          return (
        
                <EditDeliveryButton month={date.month} year={date.year} number={date.number} />
                
         
          )
        }
        else {
          return (
            <div>
              <p  className="text-xl font-bold text-red-700 animate-flash" >Next Delivery: {date.month} {date.number}, {date.year}</p>
            </div>
          )
        }
    }
    else {
      return (
        <div>
          <p  className="text-xl font-bold text-red-700 animate-flash" >Next Delivery: {date.month} {date.number}, {date.year}</p>
        </div>
      )
    }
    
 
  
}

const Categ = async ({product}) => {
  const cat = await fetchCategories(product.category_id);
  return (
    <div>{cat.category}</div>
  )
}

const Display = ({product}) => {
  var link;
  if (product.category_id === 36) {
    link = "/products/new-jersey"
  }
  else if (product.subcategory_id !== null) {
    link = `/products/new-york/sub/${product.subcategory_id}`
  }
  else {
    link = `/products/new-york/${product.category_id}`
  }

  return(
    <Link href={link}>
      <ImgSrc product={product} />
      <Categ product={product}/>
      <label className="flex justify items-center">{product.product_name}</label>
    </Link>
  )
}

export default async function Home() {
  // const [hydrated, setHydrated] = useState(false);
  const featuredProductsList = await fetchFeaturedProducts();

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
      <DeliveryDate />
      <br></br>
      <div className="mb-12 p-4 border border-red-500 rounded-md">
        <p className="text-xl">
          Five Star Souvenirs Inc. is a family-owned wholesale corporation known for its over 20 years of expertise in crafting and distributing unique, high-quality souvenirs featuring real images of New York City landmarks. With a commitment to eco-friendly materials and personalized customer relationships, the company sets itself apart by creating colorful, creative, and practical items.
        </p> 
        <hr className="my-2 border-black"/>
          
        <span className="mt-2 block">
          Read more in the <Link href="/about-us" className="text-red-500 hover:underline">About Us page</Link>!
        </span>
        
      </div>

      {/* products page*/}
      <div className="mb-4 text-xl">View our products in <Link href="/products/new-york" className="text-red-500 hover:underline">our Products Page</Link>!
      </div>


      {/* featured products*/}
      <div className="mb-8 p-4 border border-red-500 rounded-md bg-white">
        <h2 className="text-xl text-black mb-5">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-5">
          {featuredProductsList.map((featproduct) => (
            <div className="h-1/2" key={featproduct.product_id} >
              <div className="border-2 bg-red-100 flex flex-col items-center">
                <Display product={featproduct} />
                
              </div>
            </div>
          ))}
        </div>  
      </div>

      {/* Contact us page*/}
      <div className="text-xl">
        If you are interested in any of our products, please contact Five Star Souvenirs through the <Link href="/contact" className="text-red-500 hover:underline">Contact Page</Link>  to discuss more details!
      </div>

    </main>
  );
}