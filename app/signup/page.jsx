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
            <div id="signup-box" className="login-container">
                <div className="col-xs-12 col-sm-4 col-sm-offset-4 login-box flex flex-col items-center p-6 gap-10 py-20">
                    <div className="login-header flex flex-col items-center">
                        <img alt= "signupImg" src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
                        <h3>Welcome</h3>
                        <h5>PLEASE SIGN UP</h5>
                    </div>
                    <div id="signup-error-message" className="alert alert-danger"></div>
                    <form>

                        <div className="flex flex-col gap-2 py-2">
                            <label class="font-bold">First Name</label>
                            <input type="text" className="form-control border-2 border-rose-600/50" id="first_name" placeholder="Enter your first name"></input>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <label class="font-bold">Last Name</label>
                            <input type="text" className="form-control border-2 border-rose-600/50" id="signup-lastname" placeholder="Enter your last name"></input>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <label class="font-bold">Telephone Number</label>
                            <input type="tel" className="form-control border-2 border-rose-600/50" id="signup-telephonenumber" placeholder="Enter your telephone number"></input>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <label class="font-bold">Email</label>
                            <input type="email" className="form-control border-2 border-rose-600/50" id="signup-email" placeholder="Enter your email"></input>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <label class="font-bold">Password</label>
                            <input type="password" className="form-control border-2 border-rose-600/50" id="signup-password" placeholder="Enter your password"></input>
                        </div>

                        <div className="flex flex-col items-center py-5">
                            <div className="captcha-container form-group"></div>
                            <button type="button" onClick={signupAfterSubmit} class="w-[100px] h-[50px] font-bold border border-rose-600/50 hover:border-rose-600 ..." id="btn-signup">Sign Up!</button>
                        </div>
                        

                    </form>
                </div>
            </div>
    )
}


