import React from 'react'
import prisma from '../../../../utils/prisma'
import ProductPageMapping from '../../../../components/productPageMapping'
import { getSession } from '@auth0/nextjs-auth0';


const fetchSubcategories = async (id) => {
    let subcategories = await prisma.subcategories.findUnique({
        where: {subcategory_id: id}
    })
    return subcategories
  }


const fetchProducts = async (id) => {
    const products = await prisma.products.findMany({
      where: { subcategory_id: id },
    })
    return products
  }

  const fetchCategories = async (id) => {
    let categories = await prisma.category.findUnique({
         where: {category_id: id}
     })
     return categories
   }


  async function getAppMetadata(email) {
    var axios = require("axios").default;
    try {
      var getAccess = {
        method: 'POST',
        url: 'https://' + process.env.AUTH0_DOMAIN + '/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_API_CLIENT_ID,
            client_secret: process.env.AUTH0_API_CLIENT_SECRET,
            audience: process.env.AUTH0_API_ID 
        })
    };

    console.log("Made it!");
    // console.log(getAccess);

    let apiKeyInformation = [];
    await axios.request(getAccess).then(function (response) {
        apiKeyInformation = response.data;
    }).catch(function (error) {
        console.error(error);
    })

    var options = {
        method: 'GET',
        url: 'https://dev-ruajdlwtnuw587py.us.auth0.com/api/v2/users-by-email',
        params: {email: email},
        headers: {authorization: 'Bearer ' + apiKeyInformation.access_token}
    };

        const headers = {
            'Content-Type': 'application/json',
        };

        let user = [];
        await axios.request(options).then(function (response) {
            // console.log(response.data);
            user = response.data;
        }).catch(function (error) {
            console.error(error);
        });
        return user[0].app_metadata.admin

    } catch (err){
        console.log("getting metadata error", err);
    }
  }

export default async function Subcategory({ params }) {
    const id = Number(
        Array.isArray(params?.id)
          ? params?.subcategory_id[ 0 ]
          : params?.subcategory_id,
      )
    console.log(id)

    const products = await fetchProducts(id);
    // console.log(products);
    // const images = await fetchImages(product);

    const subcategory = await fetchSubcategories(id);

    const category = await fetchCategories(subcategory.catg_id);
    const session = await getSession();

    const adminMetadata = await getAppMetadata(session.user.email);

    return (
      <main>
        <h2 className="text-center py-5 lg:text-4xl font-bold">{subcategory.subcategory_name}</h2>
        <div className="flex justify-between">
            {/* side bar */}
            <div className="grid grid-cols-1 gap-5 h-4/6">
                <div className="flex flex-wrap border-black justify-items-start gap-2 w-3/4">
                    <a href="/products/new-york" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-300 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New York</a>
                    <a href="/products/new-jersey" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-100 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New Jersey</a>
                </div>
            </div>

            <ProductPageMapping products={products} categoryList={null} subcategoryList={null} isNY={true} category={category} subcategory={subcategory} subMainCategory={null} isAdmin={adminMetadata}/>
      
        </div>
    </main>
    )
}