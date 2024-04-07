import { getSession } from '@auth0/nextjs-auth0';
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

export default async function MainLinks() {
    const session = await getSession();
    
    if (!session) {
        return (
            <nav>
                <div className="hidden md:block flex items-center space-x-1">
                    <a href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
                    <a href="/products/new-york" className="py-5 px-3 text-gray-700 hover:text-gray-900">Products</a>
                    <a href="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a>
                    <a href="/about-us" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</a>
                </div>
                <div className="md:hidden">
                    <a href="/" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Home</a>
                    <a href="/products/new-york" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Products</a>
                    <a href="/contact" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Contact</a>
                    <a href="/about-us" className="block py-2 px-3 text-gray-700 hover:text-gray-900">About Us</a>
                </div>
            </nav>
            

        )
    }
    else {
        const admin = await getAppMetadata(session.user.email);
        if (admin == true) {
            return (
                <nav>
                    <div className="hidden md:block flex items-center space-x-1">
                        <a href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
                        <a href="/products/new-york" className="py-5 px-3 text-gray-700 hover:text-gray-900">Products</a>
                        <a href="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a>
                        <a href="/about-us" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</a>
                        <a href="/profile" className="py-5 px-3 text-gray-700 hover:text-gray-900">Profile</a>
                        <a href="/users" className="py-5 px-3 text-gray-700 hover:text-gray-900">Users</a> 
                    </div>
                    <div className="md:hidden">
                        <a href="/" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Home</a>
                        <a href="/products/new-york" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Products</a>
                        <a href="/contact" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Contact</a>
                        <a href="/about-us" className="block py-2 px-3 text-gray-700 hover:text-gray-900">About Us</a>
                        <a href="/profile" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Profile</a>
                        <a href="/users" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Users</a>
                    </div>
                </nav>
                
                
                
            )
        }
        else {
            return (
                <nav>
                    <div className="hidden md:block flex items-center space-x-1">
                        <a href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
                        <a href="/products/new-york" className="py-5 px-3 text-gray-700 hover:text-gray-900">Products</a>
                        <a href="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a>
                        <a href="/about-us" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</a>
                        <a href="/profile" className="py-5 px-3 text-gray-700 hover:text-gray-900">Profile</a>
                    </div>
                    <div className="md:hidden">
                        <a href="/" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Home</a>
                        <a href="/products/new-york" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Products</a>
                        <a href="/contact" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Contact</a>
                        <a href="/about-us" className="block py-2 px-3 text-gray-700 hover:text-gray-900">About Us</a>
                        <a href="/profile" className="block py-2 px-3 text-gray-700 hover:text-gray-900">Profile</a>
                    </div>
                </nav>
                
            )
        }

    }
}