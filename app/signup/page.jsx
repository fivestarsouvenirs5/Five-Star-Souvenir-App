'use client';

import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import StoresForm from '../components/storeFormSignUp';
import { Modal } from 'flowbite-react';
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '@/components/ui/avatar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';


function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);

    const [open, setOpenModal] = useState(false);

    const [isStores, setIsStores] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [stores, setStores] = useState([
        {
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
        },
    ]);

    const [errors, setErrors] = useState({});


    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const phoneValid =
        /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phoneNumber);

    const passwordChecks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*]/.test(password),
    };

    const passwordValid = Object.values(passwordChecks).every(Boolean);


    const validateField = (field, value) => {
        setErrors((prev) => {
            const updated = { ...prev };

            if (field === 'firstName') {
                if (!value.trim()) updated.firstName = 'First name is required';
                else delete updated.firstName;
            }

            if (field === 'lastName') {
                if (!value.trim()) updated.lastName = 'Last name is required';
                else delete updated.lastName;
            }

            if (field === 'email') {
                if (!value.trim()) updated.email = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    updated.email = 'Please enter a valid email';
                else delete updated.email;
            }

            if (field === 'phone') {
                if (!value.trim()) updated.phone = 'Phone number is required';
                else if (
                    !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value)
                )
                    updated.phone = 'Please enter a valid phone number';
                else delete updated.phone;
            }

            if (field === 'password') {
                const checks = {
                    length: value.length >= 8,
                    lowercase: /[a-z]/.test(value),
                    uppercase: /[A-Z]/.test(value),
                    number: /\d/.test(value),
                    special: /[!@#$%^&*]/.test(value),
                };

                if (!value.trim()) {
                    updated.password = 'Password is required';
                } else if (!Object.values(checks).every(Boolean)) {
                    updated.password =
                        'Password does not meet requirements';
                } else {
                    delete updated.password;
                }
            }

            return updated;
        });
    };


    const handleContinue = async () => {
        const newErrors = {};

        if (!firstName.trim())
            newErrors.firstName = 'First name is required';

        if (!lastName.trim())
            newErrors.lastName = 'Last name is required';

        if (!email.trim()) newErrors.email = 'Email is required';
        else if (!emailValid)
            newErrors.email = 'Please enter a valid email';

        if (!phoneNumber.trim())
            newErrors.phone = 'Phone number is required';
        else if (!phoneValid)
            newErrors.phone = 'Please enter a valid phone number';

        if (!password.trim())
            newErrors.password = 'Password is required';
        else if (!passwordValid)
            newErrors.password =
                'Password does not meet requirements';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setIsStores(true);

    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setProfilePicture(file);
        setProfilePreview(URL.createObjectURL(file));
    };

  const submitForm = async () => {
        setIsLoading(true);

        try {
            const formData = new FormData();

            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('user_email', email);
            formData.append('user_password', password);
            formData.append('phone_number', phoneNumber);
            formData.append('admin_approval', 'false');

            // Arrays/objects must be stringified
            formData.append('stores', JSON.stringify(stores));

            if (profilePicture) {
                formData.append('profile_picture', profilePicture);
            } else {
                formData.append('profile_picture', '');
            }

            const response = await fetch('/api/signup', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to signup');
            }

            await response.json();

            setIsStores(false);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setProfilePicture(null);
            setProfilePreview(null);

            setStores([
                {
                    name: '',
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                },
            ]);

            setOpenModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
         <Modal show={open} onClose={() => setOpenModal(false)} >
                    <Modal.Header>
                        <p className="text-secondary-dark font-bold text-xl">
                           Sign Up Successful!
                         </p>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="text-sm text-gray-600">
                            Your account has been submitted for approval.
                            Please wait 1-3 business days to be approved!
                            In the meantime feel free to reach out to us through the Contact Page!
                        </p>

                    </Modal.Body>
         </Modal>
            <div className="my-10 mx-auto max-w-4xl p-8 border rounded-xl shadow-lg bg-neutral-beige-light">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold text-center mb-4 w-full max-w-6xl text-secondary-dark">
                        Sign Up
                    </h1>

                    <div className="w-24 h-[2px] bg-secondary mb-3 rounded-full" />

                    <p className="text-sm text-center">
                        Please fill out all personal information and then add
                        at least 1 store to create an account.
                        <br />
                        You can add more stores and modify all information
                        later once your account is approved.
                    </p>
                </div>

                <form
                    className="space-y-6 pt-3"
                >
    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="first_name">
                                First Name
                            </label>

                            <input
                                id="first_name"
                                value={firstName}
                                disabled={isStores}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    validateField(
                                        'firstName',
                                        e.target.value
                                    );
                                }}
                                placeholder="Enter first name"
                                className="disabled:cursor-not-allowed border rounded-lg p-1 placeholder:text-sm bg-neutral-beige-light pl-2 border-text"
                            />

                            {errors.firstName && (
                                <p className="text-red-500 text-sm">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="last_name">
                                Last Name
                            </label>

                            <input
                                id="last_name"
                                value={lastName}
                                disabled={isStores}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                    validateField(
                                        'lastName',
                                        e.target.value
                                    );
                                }}
                                placeholder="Enter last name"
                                className="disabled:cursor-not-allowed border rounded-lg p-1 placeholder:text-sm bg-neutral-beige-light pl-2 border-text"
                            />

                            {errors.lastName && (
                                <p className="text-red-500 text-sm">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label>Email</label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                disabled={isStores}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateField(
                                        'email',
                                        e.target.value
                                    );
                                }}
                                placeholder="Enter email address"
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label>Phone Number</label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phoneNumber}
                                disabled={isStores}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                    validateField(
                                        'phone',
                                        e.target.value
                                    );
                                }}
                                placeholder="(555) 123-4567"
                            />

                            {errors.phone && (
                                <p className="text-red-500 text-sm">
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                    </div>

            
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                        {/* Password Section */}
                        <div>
                            <label>Password</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                disabled={isStores}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validateField('password', e.target.value);
                                }}
                                placeholder="Enter password"
                            />

                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password}
                                </p>
                            )}

                            <div className="text-sm mt-2">
                                <p className={passwordChecks.length ? 'text-green-600 mb-1' : 'mb-1'}>
                                    Must be at least 8 characters
                                </p>

                                <p className={passwordChecks.lowercase ? 'text-green-600 mb-1' : 'mb-1'}>
                                    Must contain lowercase letter (a-z)
                                </p>

                                <p className={passwordChecks.uppercase ? 'text-green-600 mb-1' : 'mb-1'}>
                                    Must contain uppercase letter (A-Z)
                                </p>

                                <p className={passwordChecks.number ? 'text-green-600 mb-1' : 'mb-1'}>
                                    Must contain number (0-9)
                                </p>

                                <p className={passwordChecks.special ? 'text-green-600 mb-1' : 'mb-1'}>
                                    Must contain special character (!@#$%^&*)
                                </p>
                            </div>
                        </div>

                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-full">
                                <label className="text-sm font-semibold">
                                    Profile Photo (Optional)
                                </label>
                            </div>

                            <Avatar className="w-32 h-32">
                                <AvatarImage
                                    src={profilePreview}
                                    className="w-32 h-32 rounded-full object-cover"
                                />

                                <AvatarFallback className="text-3xl w-32 h-32 rounded-full object-cover">
                                    {firstName?.charAt(0)}
                                    {lastName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <label
                                htmlFor="photo-upload"
                                className="w-full"
                            >
                                <div className="border rounded-md px-4 py-2 text-center cursor-pointer w-full hover:bg-muted flex items-center justify-center gap-2">
                                    <FontAwesomeIcon icon={faCamera} />
                                    Upload Photo
                                </div>
                            </label>

                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={isStores}
                                onChange={handlePhotoUpload}
                            />
                        </div>
                    </div>

                   {isStores ? 
                   (<StoresForm stores={stores} setStores={setStores} submit={submitForm} loading={isLoading}/>) 
                   :
                    (<div className="pt-4">
                        <Button className="w-full bg-primary text-white hover:bg-primary-light" onClick={handleContinue}>
                            Continue
                        </Button>
                    </div>)} 
                </form>
            </div>
        </>
    );
}

export default SignupForm;