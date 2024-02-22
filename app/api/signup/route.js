export async function POST(request) {
  try {
    const newUserDetails = await request.json()
    console.log(newUserDetails)
    const fetchURL = 'https://' + process.env.AUTH0_DOMAIN + '/dbconnections/signup'
    console.log(fetchURL)
    const response = await fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        connection: 'Five-Star-Souvenirs-Database',
        name: newUserDetails.first_name,
        given_name: newUserDetails.last_name,
        email: newUserDetails.user_email,
        password: newUserDetails.user_password, 
        user_metadata: { phonenumber: newUserDetails.phone_number },
      })
      })
      return response;
  }
  catch (error) {
    console.log("signup error", error)
  }
   
      
}
