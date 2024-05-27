'use client'
import React, { useState } from 'react';

function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [storeCity, setStoreCity] = useState('');
    const [storeState, setStoreState] = useState('');
    const [storeZipCode, setStoreZipCode] = useState('');

    const [validations, setValidations] = useState({
        firstNameValid: false,
        lastNameValid: false,
        emailValid: false,
        phoneNumberValid: false,
        passwordValid: false,
        storeNameValid: false,
        storeAddressValid: false,
        storeCityValid: false,
        storeStateValid: false,
        storeZipCodeValid: false,
    });

    const [passwordValidations, setPasswordValidations] = useState({
        minLength: false,
        lowercase: false,
        uppercase: false,
        specialChar: false,
    });

    const handleInput = (event) => {
        const { id, value } = event.target;

        if (id === 'signup-email') {
            setEmail(value);
        } else if (id === 'signup-telephonenumber') {
            if (value.length <= 10) {
                const value2 = value.replace(/[^0-9]/g, "")
                setPhoneNumber(value2);
            }
        } else if (id === 'signup-password') {
            setPassword(value);
            setValidations((prevValidations) => ({
                ...prevValidations,
                passwordValid: validatePassword(value),
            }));
            updatePasswordValidations(value);
        } else if (id === 'first_name') {
            if (/^[a-zA-Z'-]*$/.test(value)) {
                setFirstName(value);
                setValidations((prevValidations) => ({
                    ...prevValidations,
                    firstNameValid: validateName(value),
                }));
            }
            
        } else if (id === 'signup-lastname') {
            if (/^[a-zA-Z'-]*$/.test(value)) {
                setLastName(value);
                setValidations((prevValidations) => ({
                    ...prevValidations,
                    lastNameValid: validateName(value),
                }));
            }
            
        }


        else if (id === 'store-name') {
            if (/^[a-zA-Z-\'\s]*$/.test(value)) {
                setStoreName(value);
                setValidations((prevValidations) => ({
                    ...prevValidations,
                    storeNameValid: validateStoreName(value),
                }));
            }
          
          
      } else if (id === 'store-address') {
            if (/^[a-zA-Z0-9\-\'\s]*$/.test(value)) {
                setStoreAddress(value);
                setValidations((prevValidations) => ({
                    ...prevValidations,
                    storeAddressValid: value.trim() !== '',
                }));
            }
          
      } else if (id === 'store-city') {
            if (/^[a-zA-Z-\'\s]*$/.test(value)) {
                setStoreCity(value);
                setValidations((prevValidations) => ({
                    ...prevValidations,
                    storeCityValid: value.trim() !== '',
                }));
            }
          
      } else if (id === 'store-state') {
            if (value === '') {
                setStoreState("New Jersey");
                setValidations((prevValidations) => ({
                    ...prevValidations,
                    storeStateValid: value.trim() !== '',
                }));
            }
            else {
                setStoreState(value);
                setValidations((prevValidations) => ({
                    ...prevValidations,
                    storeStateValid: value.trim() !== '',
                }));
            }
      } else if (id === 'store-zipcode') {
        if (value.length <= 5) {
            const value2 = value.replace(/[^0-9]/g, "")
            setStoreZipCode(value2);
            setValidations((prevValidations) => ({
              ...prevValidations,
              storeZipCodeValid: /^\d{5}$/.test(value.trim()),
          }));
        }
            
            
      }
      if (id !== 'signup-password' && id !== 'signup-email') {
        const pattern = /^[A-Za-z\s-]+$/;
        if (pattern && !pattern.test(value)) {
            document.getElementById(id).value = value.slice(0, -1);
        }
    }
    };

    const updatePasswordValidations = (value) => {
        setPasswordValidations({
            minLength: value.length >= 8,
            lowercase: /[a-z]/.test(value),
            uppercase: /[A-Z]/.test(value),
            specialChar: /[!@#$%^&*()_+}{"':;?/><.,]/.test(value),
        });

        // Check if all password validations are true
        const isPasswordValid = Object.values(passwordValidations).every((valid) => valid);
        setValidations((prevValidations) => ({
            ...prevValidations,
            passwordValid: isPasswordValid,
        }));
    };

    const validateEmail = (email) => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        return emailPattern.test(email);
    };    

    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^[0-9]{10}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    const validateName = (name) => {
        const namePattern = /^[a-zA-Z'-]*$/;
        return namePattern.test(name);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/><.,]).{8,}$/;
        return passwordPattern.test(password);
    };

    const validateStoreName = (storeName) => {
      const namePattern = /^[a-zA-Z-\'\s]*$/;
      return namePattern.test(storeName);
  };

    const signupAfterSubmit = async () => {
        // Validation checks
        if (!validations.firstNameValid || !validations.lastNameValid || !validateEmail(email)
            || !validatePhoneNumber(phoneNumber) || !validations.passwordValid || !validations.storeNameValid ||
        !validations.storeAddressValid || !validations.storeCityValid || !validations.storeStateValid || !validations.storeZipCodeValid) {
            alert('All fields must be completed.');
            return;
        }
        if (!validations.firstNameValid || !validations.lastNameValid) {
            alert('First name and last name should only contain letters and hyphens.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            alert('Phone number should contain exactly 10 digits and only numbers.');
            return;
        }

        if (!validations.passwordValid) {
            alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
            return;
        }

        if (
          
          !validations.storeNameValid ||
          !validations.storeAddressValid ||
          !validations.storeCityValid ||
          !validations.storeStateValid ||
          !validations.storeZipCodeValid
      ) {
          alert('Please fill out all required fields correctly.');
          return;
      }

        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                user_email: email,
                user_password: password,
                phone_number: phoneNumber,
                store_name: storeName,
                store_address: storeAddress,
                store_city: storeCity,
                store_state: storeState,
                store_zipcode: storeZipCode,
                admin_approval: 'false',
            }),
        });
        
    

        if (!response.ok) {
            alert(response.error);
        } else {
            alert('Successful signup! Please wait 1-3 business days to be approved by admin.');
            const user = await response.json();
            async function addStore({ id1, newName, newStreet, newCity, newState, newZip }) {
                const response = await fetch('/api/addStore', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newId: id1, newName: newName, 
                                                        newStreet: newStreet, 
                                                        newCity: newCity, 
                                                        newState: newState, 
                                                        newZip: newZip })
                });
            
                if (!response.ok) {
                    console.log("Problem adding store");
                }
            }

            await addStore({ id1: user.user_id, newName: storeName, newStreet: storeAddress, newCity: storeCity, newState: storeState, newZip: storeZipCode });
    
            window.location.assign('/');
        }
    };

    return (
        <div id="signup-box" className="login-container">
            <div className="login-box flex flex-col items-center py-10">
                {/* <div className="login-header flex flex-col items-center">
                    <img alt="signupImg" src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
                    <h3>Welcome</h3>
                    <h5>PLEASE SIGN UP</h5>
                </div> */}
                
                {/* signup header */}
                <div className="flex flex-col items-center">
                    <img src="/images/A_star.png" alt="a star" className="w-1/12 h-1/12 py-10"/>
                    <h2 className="font-bold text-2xl">Welcome!</h2>
                    <h2 className="font-bold text-2xl mb-10 mt-5">Please Sign Up</h2>
                    <ul className="list-disc">
                        <li>First name, last name, and store name may only include letters and apostrophes</li>
                        <li>Telephone number may not include dashes, and must be 10 numbers long</li>
                        <li>If you don&apos;t select a state in the dropdown, it will default to New Jersey</li>
                    </ul>
                </div>
                      
                <div id="signup-error-message" className="alert alert-danger"></div>

                <form className="flex flex-wrap gap-20 py-10">

                    {/* personal info */}
                    <div className="bg-gray-300 ">

                        {/* first name */}
                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold">First Name</label>
                            <input
                                type="text"
                                className={`form-control border-2 ${validations.firstNameValid ? 'border-green-500' : 'border-rose-600/50'}`}
                                id="first_name"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={handleInput}
                                required
                                style={{ color: 'black' }}
                            ></input>
                        </div>

                        {/* last name */}
                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold">Last Name</label>
                            <input
                                type="text"
                                className={`form-control border-2 ${validations.lastNameValid ? 'border-green-500' : 'border-rose-600/50'}`}
                                id="signup-lastname"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={handleInput}
                                required
                                style={{ color: 'black' }}
                            ></input>
                        </div>

                    {/* email */}
                    <div className="flex flex-col gap-2 py-2">
                        <label className="font-bold">Email</label>
                        <input
                            type="email"
                            className={`form-control border-2 ${validateEmail(email) ? 'border-green-500' : 'border-rose-600/50'}`}
                            id="signup-email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleInput}
                            required
                            style={{ color: 'black' }}
                        ></input>
                        {validateEmail(email) && <span className="text-green-500">Valid email</span>}
                    </div>

                    {/* telephone number */}
                    <div className="flex flex-col gap-2 py-2">
                        <label className="font-bold">Telephone Number</label>
                        <input
                            type="tel"
                            className={`form-control border-2 ${validatePhoneNumber(phoneNumber) ? 'border-green-500' : 'border-rose-600/50'}`}
                            id="signup-telephonenumber"
                            placeholder="Enter your telephone number"
                            value={phoneNumber}
                            onChange={handleInput}
                            required
                            style={{ color: 'black' }}
                            maxLength={10}
                        ></input>
                        {validatePhoneNumber(phoneNumber) && <span className="text-green-500">Valid phone number</span>}
                    </div>

                {/* password */}
                <div className="flex flex-col gap-2 py-2">
                    <label className="font-bold">Password</label>
                    <input
                        type="password"
                        className={`form-control border-2 ${
                            passwordValidations.minLength && passwordValidations.lowercase && passwordValidations.uppercase && passwordValidations.specialChar ? 'border-green-500' : 'border-rose-600/50'
                        }`}
                        id="signup-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handleInput}
                        required
                        style={{ color: 'black' }}
                    ></input>
                    <ul className="text-sm">
                        <li style={{ color: passwordValidations.minLength ? 'green' : 'red' }}>Minimum 8 characters</li>
                        <li style={{ color: passwordValidations.lowercase ? 'green' : 'red' }}>At least 1 lowercase letter</li>
                        <li style={{ color: passwordValidations.uppercase ? 'green' : 'red' }}>At least 1 uppercase letter</li>
                        <li style={{ color: passwordValidations.specialChar ? 'green' : 'red' }}>At least 1 special character</li>
                    </ul>
                </div>
                        
                    </div>

                        
                    {/* store info */}
                    <div className="bg-red-300">
                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold">Store Name</label>
                            <input
                                type="text"
                                className={`form-control border-2 ${validations.storeNameValid ? 'border-green-500' : 'border-rose-600/50'}`}
                                id="store-name"
                                placeholder="Enter store name"
                                value={storeName}
                                onChange={handleInput}
                                required
                                style={{ color: 'black' }}
                            ></input>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold">Store Address</label>
                            <input
                                type="text"
                                className={`form-control border-2 ${validations.storeAddressValid ? 'border-green-500' : 'border-rose-600/50'}`}
                                id="store-address"
                                placeholder="Enter store address"
                                value={storeAddress}
                                onChange={handleInput}
                                required
                                style={{ color: 'black' }}
                            ></input>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold">Store City</label>
                            <input
                                type="text"
                                className={`form-control border-2 ${validations.storeCityValid ? 'border-green-500' : 'border-rose-600/50'}`}
                                id="store-city"
                                placeholder="Enter store city"
                                value={storeCity}
                                onChange={handleInput}
                                required
                                style={{ color: 'black' }}
                            ></input>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold">Store State</label>
                            {/* <input
                                type="text"
                                className={`form-control border-2 ${validations.storeStateValid ? 'border-green-500' : 'border-rose-600/50'}`}
                                id="store-state"
                                placeholder="Enter store state"
                                value={storeState}
                                onChange={handleInput}
                                required
                                style={{ color: 'black' }}
                            ></input> */}
                            <select id="store-state" value={storeState} onChange={handleInput} required>
                                            <option value="" disabled>--</option>
                                            <option value="New Jersey">New Jersey</option>
                                            <option value="New York">New York</option>
                                        </select>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold">Store Zip Code</label>
                            <input
                                type="text"
                                className={`form-control border-2 ${validations.storeZipCodeValid ? 'border-green-500' : 'border-rose-600/50'}`}
                                id="store-zipcode"
                                placeholder="Enter store zip code"
                                value={storeZipCode}
                                onChange={handleInput}
                                required
                                style={{ color: 'black' }}
                            ></input>
                        </div>
                    </div>
                
                </form>
                {/* signup button */}
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
            </div>
        </div>
    );
}

export default SignupForm;