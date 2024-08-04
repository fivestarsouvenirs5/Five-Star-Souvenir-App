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

    console.log("Made it!");
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
        url: 'https://dev-k7q6c31x25d0h3f6.us.auth0.com/api/v2/users-by-email',
        params: {email: myRequest.useremail},
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

    if (user.length == 0) {
        return new Response(JSON.stringify({noUserMessage: 'usernotfound'}), {headers});
    }
    else {
        if (user[0].user_metadata.adminapproval === 'false') {
            return new Response(JSON.stringify({userExistsButNotApproved: 'usernotapproved'}), {headers});
        }
        else if (user[0].user_metadata.adminapproval === 'true') {
            return new Response(JSON.stringify({userExistsAndApproved: 'userapproved'}), {headers});
        }
        //test if user approved message works by making someone's thing true
        else {
            return new Response(JSON.stringify({foundUserMessage: 'userfound'}), {headers});
        }
    }
}
    
        

        
        
