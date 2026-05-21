// import {useState} from 'react'
// import {useEffect} from 'react'
import prisma from './utils/prisma'
import React from 'react'
import Image from "next/image";
import { getSession } from '@auth0/nextjs-auth0';
import Hero from './components/home/hero';
import Link from "next/link";
import DeliveryDate from './components/home/deliveryDate';
import PopularProducts from './components/home/popularProducts';
import AboutUsCard from './components/home/aboutUsCard';
import GettingStarted from './components/home/gettingStarted';


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

export default async function Home() {
  // const [hydrated, setHydrated] = useState(false);

  const session = await getSession();
  let userMetadata;
  if (session) {
    userMetadata = await getAppMetadata(session.user.email);
    console.log("user metadata", userMetadata);
  }


  return (
    <div>
      <Hero />
      <DeliveryDate userMetadata={userMetadata} />
      <PopularProducts />
    
    {(!session || (session && userMetadata.user_metadata.adminapproval === 'false')) && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <AboutUsCard />
        <GettingStarted />
      </div>
    )}
    

  </div>
  );
}