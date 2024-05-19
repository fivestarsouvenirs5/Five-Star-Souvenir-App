import { getSession } from '@auth0/nextjs-auth0';
import Link from "next/link";

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
            return user[0]
    } catch (err){
        // console.log("getting metadata error", err);
    }
  }

export default async function MainLinks() {
    const session = await getSession();
    
    if (session) {
        const myUser = await getAppMetadata(session.user.email);
        if (myUser.app_metadata.admin == true) {
            return (
                <nav>
                    <div className="hidden md:block flex items-center space-x-1">
                        <Link href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                        <Link href="/products/new-york" className="py-5 px-3 text-gray-700 hover:text-gray-900">Products</Link>
                        <Link href="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</Link>
                        <Link href="/about-us" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</Link>
                        <Link href="/profile" className="py-5 px-3 text-gray-700 hover:text-gray-900">Profile</Link>
                        <Link href="/users" className="py-5 px-3 text-gray-700 hover:text-gray-900">Users</Link> 
                    </div>
                    <div className="md:hidden">
                        <Link href="/" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                        <Link href="/products/new-york" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Products</Link>
                        <Link href="/contact" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Contact</Link>
                        <Link href="/about-us" className="block py-2 px-3 text-gray-700 hover:text-gray-900">About Us</Link>
                        <Link href="/profile" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Profile</Link>
                        <Link href="/users" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Users</Link>
                    </div>
                </nav>
            )
        }
        else if (myUser.user_metadata.adminapproval === "true") {
            return (
                <nav>
                    <div className="hidden md:block flex items-center space-x-1">
                        <Link href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                        <Link href="/products/new-york" className="py-5 px-3 text-gray-700 hover:text-gray-900">Products</Link>
                        <Link href="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</Link>
                        <Link href="/about-us" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</Link>
                        <Link href="/profile" className="py-5 px-3 text-gray-700 hover:text-gray-900">Profile</Link>
                    </div>
                    <div className="md:hidden">
                        <Link href="/" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                        <Link href="/products/new-york" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Products</Link>
                        <Link href="/contact" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Contact</Link>
                        <Link href="/about-us" className="block py-2 px-3 text-gray-700 hover:text-gray-900">About Us</Link>
                        <Link href="/profile" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Profile</Link>
                    </div>
                </nav>
                
            )
        }
        else {
            return (
                <nav>
                    <div className="hidden md:block flex items-center space-x-1">
                        <Link href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                        <Link href="/products/new-york" className="py-5 px-3 text-gray-700 hover:text-gray-900">Products</Link>
                        <Link href="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</Link>
                        <Link href="/about-us" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</Link>
                    </div>
                    <div className="md:hidden">
                        <Link href="/" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                        <Link href="/products/new-york" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Products</Link>
                        <Link href="/contact" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Contact</Link>
                        <Link href="/about-us" className="block py-2 px-3 text-gray-700 hover:text-gray-900">About Us</Link>
                    </div>
                </nav>
    
            )
        }
    }
    else {
        
        return (
            <nav>
                <div className="hidden md:block flex items-center space-x-1">
                    <Link href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                    <Link href="/products/new-york" className="py-5 px-3 text-gray-700 hover:text-gray-900">Products</Link>
                    <Link href="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</Link>
                    <Link href="/about-us" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</Link>
                </div>
                <div className="md:hidden">
                    <Link href="/" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                    <Link href="/products/new-york" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Products</Link>
                    <Link href="/contact" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Contact</Link>
                    <Link href="/about-us" className="block py-2 px-3 text-gray-700 hover:text-gray-900">About Us</Link>
                </div>
            </nav>
            

        )

    }
}