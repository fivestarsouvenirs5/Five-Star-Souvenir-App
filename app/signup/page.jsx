
'use client'
import React, { useState } from 'react';

function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [validations, setValidations] = useState({
        firstNameValid: false,
        lastNameValid: false,
        emailValid: false,
        phoneNumberValid: false,
        passwordValid: false,
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
                setPhoneNumber(value);
            }
        } else if (id === 'signup-password') {
            setPassword(value);
            setValidations((prevValidations) => ({
                ...prevValidations,
                passwordValid: validatePassword(value),
            }));
            updatePasswordValidations(value);
        } else if (id === 'first_name') {
            setFirstName(value);
            setValidations((prevValidations) => ({
                ...prevValidations,
                firstNameValid: validateName(value),
            }));
        } else if (id === 'signup-lastname') {
            setLastName(value);
            setValidations((prevValidations) => ({
                ...prevValidations,
                lastNameValid: validateName(value),
            }));
        }

        // if (id !== 'signup-password' && id !== 'signup-email') {
        //     const pattern = /^[A-Za-z\s-]+$/;
        //     if (pattern && !pattern.test(value)) {
        //         document.getElementById(id).value = value.slice(0, -1);
        //     }
        // }
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
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    const validateName = (name) => {
        const namePattern = /^[A-Za-z-]+$/;
        return namePattern.test(name);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/><.,]).{8,}$/;
        return passwordPattern.test(password);
    };

    const signupAfterSubmit = async () => {
        // Validation checks
        // if (!validations.firstNameValid || !validations.lastNameValid) {
        //     alert('First name and last name should only contain letters and hyphens.');
        //     return;
        // }

        // if (!validateEmail(email)) {
        //     alert('Please enter a valid email address.');
        //     return;
        // }

        // if (!validatePhoneNumber(phoneNumber)) {
        //     alert('Phone number should contain exactly 10 digits.');
        //     return;
        // }

        // if (!validations.passwordValid) {
        //     alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
        //     return;
        // }

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
                admin_approval: 'false',
            }),
        });

        if (!response.ok) {
            alert(response.error);
        } else {
            alert('Successful signup! Please wait 1-3 business days to be approved by admin.');
            window.location.assign('/');
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
                            className={`form-control border-2 ${validations.firstNameValid ? 'border-green-500' : 'border-rose-600/50'}`}
                            id="first_name"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={handleInput}
                            required
                            style={{ color: 'black' }}
                        ></input>
                    </div>

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
