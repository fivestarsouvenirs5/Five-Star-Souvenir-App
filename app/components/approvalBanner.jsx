import { getSession } from '@auth0/nextjs-auth0';

async function getUserMetadata(email) {
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
        return user[0].user_metadata.adminapproval
  
    } catch (err){
        // console.log("getting metadata error", err);
    }
  }

export async function ApproveBanner() {
    const session = await getSession();
    if (session){
      const user = session.user;
      const approvalStatus = await getUserMetadata(user.email);
    //   console.log(approvalStatus)
      if (approvalStatus === "false") {
        return (
            <div className="bg-red-500 text-white py-2 text-center">
              Your account is pending approval. Please wait to be approved.
            </div>
          ) 
      }
    }
    else {
        return <div></div>
    }
};
