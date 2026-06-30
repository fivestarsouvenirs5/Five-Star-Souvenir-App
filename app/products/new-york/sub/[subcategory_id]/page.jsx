import React from 'react'
import prisma from '../../../../utils/prisma'
import ProductPageMapping from '../../../../components/productsPage/productPageMapping'
import { getSession } from '@auth0/nextjs-auth0';


const fetchStores = async (id) => {
    try {
      const stores = await prisma.stores.findMany({
        where: { user_id: id },
      });
      return stores;
    } catch (error) {
      // Handle error
      console.error("Error fetching stores:", error);
      throw error; // Re-throw the error if needed
    }
  };

const fetchSubcategories = async (id) => {
    let subcategories = await prisma.subcategories.findUnique({
        where: {subcategory_id: id},
    })
    return subcategories
  }


const fetchProducts = async (id) => {
    const products = await prisma.products.findMany({
      where: { subcategory_id: id },
      // orderBy: {
      //   product_name: 'asc',
      // },
    })
    return products
  }

  const fetchCategories = async (id) => {
    let categories = await prisma.category.findUnique({
         where: {category_id: id},
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

   // console.log("Made it!");
    // console.log(getAccess);

    let apiKeyInformation = [];
    await axios.request(getAccess).then(function (response) {
        apiKeyInformation = response.data;
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
            // console.log(response.data);
            user = response.data;
        }).catch(function (error) {
            console.error(error);
        });
        return user[0]

    } catch (err){
        // console.log("getting metadata error", err);
    }
  }

export default async function Subcategory({ params }) {
    const id = Number(
        Array.isArray(params?.id)
          ? params?.subcategory_id[ 0 ]
          : params?.subcategory_id,
      )
    // console.log(id)

    const products = await fetchProducts(id);
    // console.log(products);
    // const images = await fetchImages(product);

    const subcategory = await fetchSubcategories(id);

    const category = await fetchCategories(subcategory.catg_id);
    const session = await getSession();

    var adminMetadata;
    var approvalStatus;
    var stores;
    if (session) {
        var myUser =  await getAppMetadata(session.user.email);
        adminMetadata = myUser.app_metadata.admin;
        approvalStatus = myUser.user_metadata.adminapproval;
        stores = await fetchStores(myUser.user_id);
    }
    else {
        adminMetadata = false;
    }
    return (
      <main>

            <ProductPageMapping products={products} categoryList={null} subcategoryList={null} isNY={true} category={category} subcategory={subcategory} subMainCategory={null} isAdmin={adminMetadata} isApproved={approvalStatus} stores={stores}/>
      
    </main>
    )
}