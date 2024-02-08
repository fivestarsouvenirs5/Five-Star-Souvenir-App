'use client'
import auth0 from 'auth0-js';
import React from 'react'
import { Button, Modal } from 'flowbite-react';
// import { useState } from 'react';
require('dotenv').config();
// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'

{/* <script src="https://cdn.auth0.com/js/auth0/9.11/auth0.min.js"></script> */}


// async function signUpDatabase({first_name, last_name, email, telephone_number, approval_status}) {
//     alert("hello");
//     // const router = useRouter()
//     // e.preventDefault()
//     alert("Now going to database");
//         console.log(first_name);
//         const body = {firstname: first_name, lastname: last_name, user_email: email, phonenumber: telephone_number, approvalstatus: approval_status};
//         console.log(body);
//         await fetch('/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: body,
//         })
//     // try {
//     //     alert("Now going to database");
//     //     const body = {first_name, last_name, email, telephone_number, approval_status};
//     //     console.log(body);
//     //     await fetch('/api/signup', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify(body),
//     //     })

//     //     router.push('/')
//     // } catch (error) {
//     //     console.error(error)
//     // }
// }

function signupAfterSubmit() {
    const auth0Domain = process.env.domain;
    console.log(auth0Domain);
    const auth0ClientId = process.env.clientID;
    console.log(auth0ClientId);

    const auth0Config = {
        domain: auth0Domain,
        clientID: auth0ClientId,
    }

    const auth0SignUp = new auth0.WebAuth(auth0Config);

    var firstname = document.getElementById('first_name').value;
    console.log(firstname);
    var lastname = document.getElementById('signup-lastname').value;
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;
    var phonenumber = document.getElementById('signup-telephonenumber').value;

    auth0SignUp.signup({
        connection: 'Five-Star-Souvenirs-Database',
        name: firstname,
        given_name: lastname,
        email: email,
        password: password, 
        user_metadata: { phonenumber: phonenumber },
        // app_metadata: {approval_status: true}
      }, function (err, result) {
        if (err) {
          console.error(err);
          return alert("Something went wrong with your signup.");
        } else {
          return alert("Successful signup! Yay!");
        }
    });
}


export default function signup() {
    return(
        <html>
            
            <div id="signup-box" className="login-container">
                <div className="col-xs-12 col-sm-4 col-sm-offset-4 login-box">
                    <div className="login-header">
                        <img alt= "signupImg" src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
                        <h3>Welcome</h3>
                        <h5>PLEASE SIGN UP</h5>
                    </div>
                    <div id="signup-error-message" className="alert alert-danger"></div>
                    <form>
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
        </html>
    )
}


