'use client'
import React from 'react';

async function signupAfterSubmit() {
  const firstname = document.getElementById('first_name').value;
  const lastname = document.getElementById('signup-lastname').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const phonenumber = document.getElementById('signup-telephonenumber').value;
  const original_admin_approval = 'false';

  // Validation regex patterns
  const namePattern = /^[A-Za-z-]+$/;
  const emailPattern = /^[A-Za-z0-9._%+-]+@(gmail|yahoo)\.com$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/><.,]).{8,}$/;
  const phoneNumberPattern = /^\d+$/;

  // Validation checks
  if (!namePattern.test(firstname) || !namePattern.test(lastname)) {
    alert('First name and last name should only contain letters and hyphens.');
    return;
  }

  if (!emailPattern.test(email)) {
    alert('Please enter a valid Gmail or Yahoo email address.');
    return;
  }

  if (!passwordPattern.test(password)) {
    alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
    return;
  }

  if (!phoneNumberPattern.test(phonenumber)) {
    alert('Phone number should contain only numbers.');
    return;
  }

  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name: firstname,
      last_name: lastname,
      user_email: email,
      user_password: password,
      phone_number: phonenumber,
      admin_approval: original_admin_approval
    })
  });

  if (!response.ok) {
    alert('There is a problem signing up. Please check that the information in the fields is valid & that your password is strong enough! Also, you may already have an account :)');
  } else {
    alert('Successful signup! Please wait 1-3 business days to be approved by admin.');
    window.location.assign('/');
  }
}

// Form component
function SignupForm() {
    // Function to handle input events and restrict input based on pattern
    const handleInput = (event) => {
      const { id, value } = event.target;
      let pattern;
      if (id === 'signup-telephonenumber') {
        pattern = /^[0-9]+$/; // Pattern to allow only numbers for telephone number
      } else {
        pattern = /^[A-Za-z\s-]+$/; // Pattern to allow letters, spaces, and hyphens for name inputs
      }
  
      if (!pattern.test(value)) {
        document.getElementById(id).value = value.slice(0, -1);
      }
    };
  
    return (
      <div id="signup-box" className="login-container">
        <div className="col-xs-12 col-sm-4 col-sm-offset-4 login-box flex flex-col items-center p-6 gap-10 py-20">
          <div className="login-header flex flex-col items-center">
            <img alt="signupImg" src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
            <h3>Welcome</h3>
            <h5>PLEASE SIGN UP</h5>
          </div>
          <div id="signup-error-message" className="alert alert-danger"></div>
          <form>
            <div className="flex flex-col gap-2 py-2">
              <label className="font-bold">First Name</label>
              <input
                type="text"
                className="form-control border-2 border-rose-600/50"
                id="first_name"
                placeholder="Enter your first name"
                onInput={handleInput} // Call handleInput function on input event
                required
                style={{ color: 'black' }}
              ></input>
            </div>
  
            <div className="flex flex-col gap-2 py-2">
              <label className="font-bold">Last Name</label>
              <input
                type="text"
                className="form-control border-2 border-rose-600/50"
                id="signup-lastname"
                placeholder="Enter your last name"
                onInput={handleInput} // Call handleInput function on input event
                required
                style={{ color: 'black' }}
              ></input>
            </div>
  
            <div className="flex flex-col gap-2 py-2">
              <label className="font-bold">Telephone Number</label>
              <input
                type="tel"
                className="form-control border-2 border-rose-600/50"
                id="signup-telephonenumber"
                placeholder="Enter your telephone number"
                onInput={handleInput} // Call handleInput function on input event
                required
                style={{ color: 'black' }}
              ></input>
            </div>
  
            <div className="flex flex-col gap-2 py-2">
              <label className="font-bold">Email</label>
              <input
                type="email"
                className="form-control border-2 border-rose-600/50"
                id="signup-email"
                placeholder="Enter your email"
                required
                style={{ color: 'black' }}
              ></input>
            </div>
  
            <div className="flex flex-col gap-2 py-2">
              <label className="font-bold">Password</label>
              <input
                type="password"
                className="form-control border-2 border-rose-600/50"
                id="signup-password"
                placeholder="Enter your password"
                required
                style={{ color: 'black' }}
              ></input>
            </div>
  
            <div className="flex flex-col items-center py-5">
              <div className="captcha-container form-group"></div>
              <button
                type="button"
                onClick={signupAfterSubmit}
                className="w-[100px] h-[50px] font-bold border border-rose-600/50 hover:border-rose-600 ..."
                id="btn-signup"
              >
                Sign Up!
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default SignupForm;
  