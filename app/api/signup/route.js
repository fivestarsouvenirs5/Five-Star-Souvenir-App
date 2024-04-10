export async function POST(request) {
  const newUserDetails = await request.json()
  try {
    console.log(newUserDetails)
    console.log(newUserDetails.admin_approval)
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
        user_metadata: { phonenumber: newUserDetails.phone_number, adminapproval: newUserDetails.admin_approval },
      })
      })
      if (response.ok) {
        const brevo = require('@getbrevo/brevo');
        let apiInstance = new brevo.TransactionalEmailsApi();
        let apiKey = apiInstance.authentications['apiKey'];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        
        let sendSmtpEmail = new brevo.SendSmtpEmail(); 
        sendSmtpEmail.subject = "New user request";
        sendSmtpEmail.htmlContent = `<html><body>
                                        <h2>Name: ${newUserDetails.first_name} ${newUserDetails.last_name}</h2>
                                        <h2>Email: ${newUserDetails.user_email}</h2>
                                        <h2>Phone: ${newUserDetails.phone_number}</h2>
                                        <h2>Store Name: name</h2>
                                        <h2>Store Address: *street* *city* *state* *zip*</h2>
                                    </body></html>`;
        sendSmtpEmail.sender = { name: 'App', email: 'akelnik.9@gmail.com' };
        sendSmtpEmail.to = [{ email: 'akelnik.9@gmail.com', name: 'Five Star Souvenirs' }];
      
        
        const headers = { 'Content-Type': 'application/json' };
      
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      }
      return response;
     
  }
  catch (error) {
    console.log("signup error", error)
    return response;
  }

      
}
