'use client'
import auth0 from 'auth0-js';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

{/* <script src="https://cdn.auth0.com/js/auth0/9.11/auth0.min.js"></script> */}


function signupAfterSubmit() {
    const auth0Config = {
        domain: 'dev-ruajdlwtnuw587py.us.auth0.com',
        clientID: 'eRA4f5qgaavK99bNnxheJOUpP4QgxiHO',
    };
    const auth0SignUp = new auth0.WebAuth(auth0Config);

    const firstname = document.getElementById('first_name').value
    const lastname = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phonenumber = document.getElementById('signup-telephonenumber').value;
    
    auth0SignUp.signup({
        connection: 'Five-Star-Souvenirs-Database',
        name: firstname,
        given_name: lastname,
        email: email,
        password: password, 
        user_metadata: { phonenumber: phonenumber },
        app_metadata: {approval_status: false}
      }, function (err, result) {
        if (err) {
          console.error(err);
          return alert("Something went wrong with your signup.");
        } else {
          console.log(result);
          return alert("Successful signup! Yay!");
          // Handle successful sign-up
        }
    });

    // const [ firstname, setFirst_name ] = useState('')
    // const [ last_name, setLast_name ] = useState('')
    // const [ email, setEmail ] = useState('')
    // const [ phone_number, setPhone_number ] = useState('')
    // const [ approval_status, setApproval_status ] = useState('')
    const router = useRouter()
    const submitData = async (e) => {
        e.preventDefault()
        try {
          await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
    
          router.push('/logged-in')
        } catch (error) {
          console.error(error)
        }
      }
}


export default function signup() {
    
    
    return(
        <html>
            
            <div id="signup-box" className="login-container">
                <div className="col-xs-12 col-sm-4 col-sm-offset-4 login-box">
                    <div className="login-header">
                        <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
                        <h3>Welcome</h3>
                        <h5>PLEASE SIGN UP</h5>
                    </div>
                    <div id="signup-error-message" className="alert alert-danger"></div>
                    <form onSubmit={signupAfterSubmit}>
                        <div className="form-group">
                            <label for="name">First Name</label>
                            <input type="text" className="form-control" id="first_name" placeholder="Enter your first name"></input>
                        </div>
                        <div className="form-group">
                            <label for="name">Last Name</label>
                            <input type="text" className="form-control" id="signup-lastname" placeholder="Enter your last name"></input>
                        </div>
                        <div className="form-group">
                            <label for="name">Telephone Number</label>
                            <input type="tel" className="form-control" id="signup-telephonenumber" placeholder="Enter your telephone number"></input>
                        </div>
                        <div className="form-group">
                            <label for="name">Email</label>
                            <input type="email" className="form-control" id="signup-email" placeholder="Enter your email"></input>
                        </div>
                        <div className="form-group">
                            <label for="name">Password</label>
                            <input type="password" className="form-control" id="signup-password" placeholder="Enter your password"></input>
                        </div>
                        <div className="captcha-container form-group"></div>
                        <button type="button" onClick={signupAfterSubmit} class="w-[100px] h-[50px] font-bold border border-rose-600/50 hover:border-rose-600 ..." id="btn-signup">Sign Up!</button>

                    </form>
                </div>
            </div>
        
            {/* <script>
                <script src="/js/signup.js"></script>
                
            </script> */}

        </html>
    )
}


