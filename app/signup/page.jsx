'use client'
import React from 'react'

async function signupAfterSubmit() {
    const firstname = document.getElementById('first_name').value;
    console.log(firstname);
    const lastname = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phonenumber = document.getElementById('signup-telephonenumber').value;
    const original_admin_approval = 'false';

    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({first_name: firstname, last_name: lastname, user_email: email, user_password: password, phone_number: phonenumber, admin_approval: original_admin_approval})
      });
      if (!response.ok) {
        alert('There is a problem signin up. Please check that the information in the fields is valid & that your password is strong enough! Also, you may already have an account :)')
        // throw new Error('Failed to signup');
      }
      else {
        alert('Successful signup! Please wait 1-3 business days to be approved by admin.')
        window.location.assign('/');
      }
}


export default function signup() {
    // const [email, setEmail] = useState("");
    // const handleOnChange = (e) => {
    //     setEmail(e.target.value);
    // }

    // const [message, setMessage] = useState("");
    // const emailValidation = () => {
    //     const regEx = /[a-zA-z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,8}(.[a-z {2-8}])?/g
    //     if (regEx.test(email)) {
    //         setMessage("Email is Valid")
    //     }
    //     else if (!regEx.test(email) && email != " ") {
    //         setMessage("Email is Not Valid");
    //     }
    //     else {
    //         setMessage(" ");
    //     }
    // }
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


