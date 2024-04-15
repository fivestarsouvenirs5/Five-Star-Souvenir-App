import { getSession } from '@auth0/nextjs-auth0';
import UsersPage from '../components/usersPage';

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


export default async function Users() {
  const session = await getSession();
  if (session){
    const user = session.user;
    const admin = await getAppMetadata(user.email) 
    if (admin){
      return (
        <div>
          <UsersPage />
        </div>
      )
    }
    else {
      return(
        <div>Page not Available</div>
      )
    }
  }
  else {
    return(
      <div>Page not Available</div>
    )
  }
}
