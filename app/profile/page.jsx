import React from 'react'
import prisma from '../utils/prisma'
import { getSession } from '@auth0/nextjs-auth0';
import AddStoreButton from '../components/addStoreButton';
import StoreSelector from '../components/storeSelector';


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
      return user

  } catch (err){
      // console.log("getting metadata error", err);
  }
}



export default async function ProfileServer() {
  const session = await getSession();
  if (session){
    const user = session.user;
    const user2 = await getAppMetadata(user.email);
    // console.log(user2)
    if(user2[0].user_metadata.adminapproval === "true") {
      const stores = await fetchStores(user2[0].user_id);

      return (
          user && (
              <div className="m-10">
                
                <h1 className="mt-3 mb-3 md:font-bold text-2xl">Profile</h1>
                <div className="h-1 bg-rose-600/50 rounded"/>

                <div className="flex flex-row items-center">
                  <img className="w-30 rounded-full mr-10 ml-5" alt="userImg" src={user2[0].picture} />
                  <div className="flex flex-col px-20 m-10">
                    <h1 className="mb-4 text-2xl md:font-bold">{user2[0].name} {user2[0].given_name}</h1>
                    <table>
                      <tbody>
                        <tr>
                          <td>Email:</td>
                          <td className="pl-5">{user2[0].email}</td>
                        </tr>
                        <tr>
                          <td>Phone Number:</td>
                          <td className="pl-5">{user2[0].user_metadata.phonenumber}</td>
                        </tr>
                      </tbody>
                    </table>

                      
                    <StoreSelector storeList= {stores} />

                    <AddStoreButton id1={user2[0].user_id}/>

                    
                  </div>
                
                </div>         
              </div>
          )
      );
    }
    else {
      return (
        <div>
          <h2>Page not Available</h2>
        </div>
      )
    }
    
  }
  else {
    return (
      <div>
        <h2>Page not Available</h2>
      </div>
    )
  }
  
  
}