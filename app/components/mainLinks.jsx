// import { getSession } from '@auth0/nextjs-auth0';
// import Link from "next/link";

// async function getAppMetadata(email) {
//     var axios = require("axios").default;
//     try {
//         var getAccess = {
//             method: 'POST',
//             url: 'https://' + process.env.AUTH0_DOMAIN + '/oauth/token',
//             headers: {'content-type': 'application/json'},
//             data: {
//                 grant_type: 'client_credentials',
//                 client_id: process.env.AUTH0_API_CLIENT_ID,
//                 client_secret: process.env.AUTH0_API_CLIENT_SECRET,
//                 audience: process.env.AUTH0_API_ID 
//             }
//         };
    
//         // console.log("Made it!");
//         // console.log(getAccess);
    
//         let apiKeyInformation = [];
//         await axios.request(getAccess).then(function (response) {
//             apiKeyInformation = response.data;
//             //console.log(apiKeyInformation)
//         }).catch(function (error) {
//             console.error(error);
//         })
    
//         var options = {
//             method: 'GET',
//             url: 'https://dev-k7q6c31x25d0h3f6.us.auth0.com/api/v2/users-by-email',
//             params: {email: email},
//             headers: {authorization: 'Bearer ' + apiKeyInformation.access_token}
//         };
    
//             const headers = {
//                 'Content-Type': 'application/json',
//             };
    
//             let user = [];
//             await axios.request(options).then(function (response) {
//                 //console.log(response.data);
//                 user = response.data;
//             }).catch(function (error) {
//                 console.error(error);
//             });
//             return user[0]
//     } catch (err){
//         // console.log("getting metadata error", err);
//     }
//   }

// export default async function MainLinks() {
//     const session = await getSession();
    
//     if (session) {
//         const myUser = await getAppMetadata(session.user.email);
//             return (
//                 <nav>
//                     <div className="hidden md:block flex items-center space-x-1">
//                         <Link href="/" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">Home</Link>
//                         <Link href="/products/new-york" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">Products</Link>
//                         <Link href="/contact" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">Contact</Link>
//                         <Link href="/about-us" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">About Us</Link>
//                         {myUser.app_metadata.adminapproval === true && (
//                             <Link href="/profile" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">Profile</Link>
//                         )}
//                         {myUser.app_metadata.admin === true && (
//                             <Link href="/users" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">Users</Link>
//                         )}
//                     </div>
//                 </nav>
//             )
//         }
//     else {
//         return (
//             <nav>
//                 <div className="hidden md:block flex items-center space-x-1">
//                     <Link href="/" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">Home</Link>
//                     <Link href="/products/new-york" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">Products</Link>
//                     <Link href="/contact" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">Contact</Link>
//                     <Link href="/about-us" className="py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark">About Us</Link>
//                 </div>
//             </nav>
            

//         )

//     }
// }
"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

async function getAppMetadata(email) {
  const axios = (await import("axios")).default;

  const getAccess = {
    method: "POST",
    url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/json" },
    data: {
      grant_type: "client_credentials",
      client_id: process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_SECRET,
      audience: process.env.NEXT_PUBLIC_AUTH0_API_ID,
    },
  };

  const tokenRes = await axios.request(getAccess);

  const options = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users-by-email`,
    params: { email },
    headers: { authorization: `Bearer ${tokenRes.data.access_token}` },
  };

  const userRes = await axios.request(options);

  return userRes.data[0];
}

export default function MainLinks() {
  const { user } = useUser();
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const load = async () => {
      const data = await getAppMetadata(user.email);
      setMyUser(data);
    };

    load();
  }, [user]);

  return (
    <nav  className="hidden md:block flex items-center space-x-1">
      <Link href="/" className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline">
        Home
      </Link>

      <Link href="/products/new-york" className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline">
        Products
      </Link>

      <Link href="/contact" className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline">
        Contact
      </Link>

      <Link href="/about-us" className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline">
        About Us
      </Link>

      {myUser?.app_metadata?.adminapproval && (
        <Link href="/profile" className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline">
          Profile
        </Link>
      )}

      {myUser?.app_metadata?.admin && (
        <Link href="/users" className="py-2 md:py-5 px-3 text-neutral-beige-light hover:text-neutral-beige-dark hover:underline">
          Users
        </Link>
      )}
    </nav>
  );
}