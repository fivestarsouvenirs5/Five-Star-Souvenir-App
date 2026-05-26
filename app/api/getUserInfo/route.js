export async function POST(request) {
        const myRequest = await request.json(); 
        
    var axios = require("axios").default;
    try {
        var getAccess = {
            method: 'POST',
            url: 'https://' + process.env.NEXT_PUBLIC_AUTH0_DOMAIN + '/oauth/token',
            headers: {'content-type': 'application/json'},
            data: {
                grant_type: 'client_credentials',
                client_id: process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_SECRET,
                audience: process.env.NEXT_PUBLIC_AUTH0_API_ID 
            }
        };
    
        let apiKeyInformation = [];
        await axios.request(getAccess).then(function (response) {
            apiKeyInformation = response.data;
        }).catch(function (error) {
            console.error(error);
        })
    
        var options = {
            method: 'GET',
            url: 'https://dev-k7q6c31x25d0h3f6.us.auth0.com/api/v2/users-by-email',
            params: {email: myRequest.email},
            headers: {authorization: 'Bearer ' + apiKeyInformation.access_token}
        };
    
            const headers = {
                'Content-Type': 'application/json',
            };
    
            let user = [];
            await axios.request(options).then(function (response) {
                user = response.data;
            }).catch(function (error) {
                console.error(error);
            });
             return new Response(JSON.stringify({myUser: user[0]}), headers);
    } catch (err){
        console.log("getting metadata error", err);
    }

       
    }