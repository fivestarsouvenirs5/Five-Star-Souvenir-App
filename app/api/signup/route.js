import {Resend} from 'resend';
import prisma from '../../utils/prisma';
import { put } from '@vercel/blob';

async function sendAdminEmail(newUserDetails, response) {
  //console.log(response)
  if (response.ok) {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'info@fivestarsouvenirs.com',
      to: ['info@fivestarsouvenirs.com'],
      subject: 'New user request',
      html: `<html><body> <h2>Name: ${newUserDetails.first_name} ${newUserDetails.last_name}</h2> <h2>Email: ${newUserDetails.user_email}</h2><h2>Phone: ${newUserDetails.phone_number}</h2> <h2>Store Name: ${newUserDetails.stores[0].store_name}</h2><h2>Store Address: ${newUserDetails.stores[0].store_address}, ${newUserDetails.stores[0].store_city}, ${newUserDetails.stores[0].store_state}, ${newUserDetails.stores[0].store_zipcode}</h2></body></html>`,
    });
    
    // const brevo = require('@getbrevo/brevo');
    // let apiInstance = new brevo.TransactionalEmailsApi();
    // let apiKey = apiInstance.authentications['apiKey'];
    // apiKey.apiKey = process.env.BREVO_API_KEY;
    
    // let sendSmtpEmail = new brevo.SendSmtpEmail(); 
    // sendSmtpEmail.subject = "New user request";
    // sendSmtpEmail.htmlContent = `<html><body>
    //                                 <h2>Name: ${newUserDetails.first_name} ${newUserDetails.last_name}</h2>
    //                                 <h2>Email: ${newUserDetails.user_email}</h2>
    //                                 <h2>Phone: ${newUserDetails.phone_number}</h2>
    //                                 <h2>Store Name: name</h2>
    //                                 <h2>Store Address: *street* *city* *state* *zip*</h2>
    //                             </body></html>`;
    // sendSmtpEmail.sender = { name: 'App', email: 'akelnik.9@gmail.com' };
    // sendSmtpEmail.to = [{ email: 'akelnik.9@gmail.com', name: 'Five Star Souvenirs' }];
  
    
    // const headers = { 'Content-Type': 'application/json' };
  
    // const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    //console.log('Confirmation email sent successfully');
    //console.log(newUserDetails)
  }
}

export async function POST(request) {
  const formData = await request.formData();

  const profilePicture = formData.get('profile_picture');

  const newUserDetails = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    user_email: formData.get('user_email'),
    user_password: formData.get('user_password'),
    phone_number: formData.get('phone_number'),
    admin_approval: formData.get('admin_approval'),
    stores: JSON.parse(formData.get('stores') || '[]'),
  };


  try {
    if (!newUserDetails.first_name || !newUserDetails.last_name || !newUserDetails.user_email || !newUserDetails.user_password || !newUserDetails.phone_number) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    //picture upload
    let photoUrl = null;

    if ( profilePicture && profilePicture instanceof File && profilePicture.size > 0 ) {
      const blob = await put(
        `profile-pictures/${Date.now()}_${newUserDetails.first_name}_${newUserDetails.last_name}`,
        profilePicture,
        {
          access: 'public',
        }
      );

      photoUrl = blob.url;
    }

    const fetchURL = 'https://' + process.env.AUTH0_DOMAIN + '/dbconnections/signup'

    let response;

    if (photoUrl !== null) {
      console.log("pic")
       response = await fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        connection: 'Username-Password-Authentication',
        name: newUserDetails.first_name,
        given_name: newUserDetails.last_name,
        email: newUserDetails.user_email,
        password:newUserDetails.user_password, 
        user_metadata: { phonenumber: newUserDetails.phone_number, adminapproval: "false"},
        picture: photoUrl,
      })

      })
    }
    else {
       response = await fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        connection: 'Username-Password-Authentication',
        name: newUserDetails.first_name,
        given_name: newUserDetails.last_name,
        email: newUserDetails.user_email,
        password:newUserDetails.user_password, 
        user_metadata: { phonenumber: newUserDetails.phone_number, adminapproval: "false"},
      })

      })
    }

   

      if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Failed to create Auth0 user' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const responseData = await response.json();
      console.log(responseData);
      const userId = responseData._id;
      //console.log("userid:" + userId)
      for (const store of newUserDetails.stores) {
        await prisma.stores.create({
          data: {
            store_name: store.name,
            user_id: "auth0|" + userId,
            store_street: store.street,
            store_city: store.city,
            store_state: store.state,
            store_zip: store.zip,
          },
        });
      }
      

      await sendAdminEmail(newUserDetails, response);
     
      return new Response(JSON.stringify({ message: 'User signed up successfully'}), { status: 200, headers: { 'Content-Type': 'application/json' } }, { user_id: userId});
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
      
}
