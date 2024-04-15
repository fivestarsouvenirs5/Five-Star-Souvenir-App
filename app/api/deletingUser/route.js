export async function POST(request) {
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
        url: 'https://dev-ruajdlwtnuw587py.us.auth0.com/api/v2/users-by-email',
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

    let userid = user[0].user_id;

    let userData = []
    axios.delete('https://' + process.env.AUTH0_DOMAIN + '/api/v2/users/' + userid, {
        headers: {
            authorization: 'Bearer ' + apiKeyInformation.access_token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // console.log('User deleted successfully:', response.data);
        userData = response.data;
        // console.log(userData);
    })
    .catch(error => {
        // console.error('Error deleted user:', error.response.data);
    })
    return new Response(JSON.stringify({userDeleted: 'userdeleted'}), {headers});
}