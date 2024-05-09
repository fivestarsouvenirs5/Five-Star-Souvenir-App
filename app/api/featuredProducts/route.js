import axios from "axios"

export async function POST(request) {
    //console.log('reached server post request'); 
        const myRequest = await request.json(); // Assuming cartDetails is sent in the request body
        //console.log(myRequest.useremail);

        var axios = require("axios").default;

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
   
        var axios = require("axios").default;

        var options = {
            method: 'GET',
            url: 'https://dev-ruajdlwtnuw587py.us.auth0.com/api/v2/users?fields=name,given_name,email,user_metadata.phonenumber',
            params: {q: 'user_metadata.adminapproval: "true"', search_engine: 'v3'},
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
        // console.log(user);
        // const jsonStringOfUser = JSON.parse(JSON.stringify(user));
        // console.log(jsonStringOfUser)
        // console.log(user.email);
        return new Response(JSON.stringify(user), {headers});
   }