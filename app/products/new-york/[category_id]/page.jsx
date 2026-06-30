import React from 'react'
import prisma from '../../../utils/prisma'
import ProductPageMapping from '../../../components/productsPage/productPageMapping'
import { getSession } from '@auth0/nextjs-auth0';

const fetchCategories = async (id) => {
 let categories = await prisma.category.findUnique({
      where: {category_id: id},
  })
  return categories
}

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
  const subcategories = await prisma.subcategories.findMany({
    where: { catg_id: id },
    orderBy: {
      subcategory_name: 'asc',
    },
  })
  return subcategories
}

const fetchProducts = async (id) => {
  const products = await prisma.products.findMany({
    where: { category_id: id },
    // orderBy: {
    //   product_name: 'asc',
    // },
  })
  return products
}

const fetchClothing = async (id) => {
  const clothes = await prisma.clothing_product_size.findMany({
    where: {category_id: id},
    // NEED TO CHANGE OBV i think itd be best to add a column to the clothing_product_size table that gives the products cateogry id so that
    // here we can just say where: {category_id: id} so it can find it better
    // but idk if adding a column to the table will mess up the database stuff so i shall just leave this for now
  })
  return clothes
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

export default async function NYCategoryPage({ params }) {
  const id = Number(
    Array.isArray(params?.id)
      ? params?.category_id[ 0 ]
      : params?.category_id,
  )
const category = await fetchCategories(id);

const subcategories = await fetchSubcategories(id);
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
  if (subcategories === undefined || subcategories.length == 0) {
    const products = await fetchProducts(id);
    const clothing = await fetchClothing(id);
    return (
      <main>



            <ProductPageMapping products={products} categoryList={null} subcategoryList={null} isNY={true} category={category} subcategory={null} clothingList={clothing} subMainCategory={null} isAdmin={adminMetadata} isApproved={approvalStatus} stores={stores}/>
 
    </main>
    )
  }

else {
  const clothing = await fetchClothing(id);
  return (
    <main>

            <ProductPageMapping products={null} categoryList={null} subcategoryList={subcategories} isNY={true} category={null} subcategory={null} clothingList={clothing} subMainCategory={category} isAdmin={adminMetadata} isApproved={approvalStatus} stores={stores}/>
            
    </main>
  )
}


  
}

