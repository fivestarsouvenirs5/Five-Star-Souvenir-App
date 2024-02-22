'use client'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client';
import {useState} from 'react';
import { Button, Modal } from 'flowbite-react';

function MainLinks() {
    const {user} = useUser();
    if (!user) {
        return (
            <div className="flex items-center space-x-1">
            <img className="h-14 w-28" src="/images/Logo.png" alt="" />

                <a href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
                <a href="/products/new-york" className="py-5 px-3 text-gray-700 hover:text-gray-900">Products</a>
                <a href="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a>
                <a href="/about-us" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</a>
            </div>
        )
    }
    else {
        return (
            <div className="flex items-center space-x-1">
            <img className="h-14 w-28" src="/images/Logo.png" alt="" />

                <a href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
                <a href="/products/new-york" className="py-5 px-3 text-gray-700 hover:text-gray-900">Products</a>
                <a href="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a>
                <a href="/about-us" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</a>
                <a href="/profile" className="py-5 px-3 text-gray-700 hover:text-gray-900">Profile</a>
            </div>
            
        )
    }
}

function AuthenticationButtons() {
    const [openModal, setOpenModal] = useState(false);
    const {user} = useUser();
    if (!user) {
        return (
            <div className="flex items-center space-x-1">
            <a href="/signup" className="py-2 px-3 bg-blue-400 hover:bg-blue-300 text-blue-900 hover:text-blue-800 rounded">Signup</a>
            {/* <a href="/api/auth/login" className="py-2 px-3 bg-blue-400 hover:bg-blue-300 text-blue-900 hover:text-blue-800 rounded">Login</a> */}
                
            <button className="py-2 px-3 bg-blue-400 hover:bg-blue-300 text-blue-900 hover:text-blue-800 rounded" onClick={() => setOpenModal(true)}> 
                Login
            </button>
            
            

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Please Enter Your Email</Modal.Header>
                <Modal.Body>    
                        <div className="flex flex-col gap-2 py-2">
                            <label class="font-bold">Email</label>
                            <input type="email" className="form-control border-2 border-rose-600/50" id="signup-email" placeholder="Enter your email"></input>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={async () => {
                    //new code
                    //const [loading, setLoading] = useState(false);
                    var useremail = document.getElementById('signup-email').value;

                    try {
                        //setLoading(true);
                        const response = await fetch('/api/login', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({useremail})
                        });
                        
                        console.log(response.status);
                        const myResponse = await response.json();
                        console.log(myResponse);
                        if (!response.ok) {
                            alert("This is an incorrect email.");
                            throw new Error('Failed to fetch the email of this user');
                        }
                        else {
                            if (myResponse.noUserMessage == "usernotfound") {
                                alert("It seems that you are not registered. Please make sure there are not typos in the email or go to signup to register.");
                                window.location.assign("/signup")
                            }
                            else {
                                if (myResponse.userExistsButNotApproved == "usernotapproved") {
                                    alert("You are not a valid user. You must wait for admin.");
                                }
                                else if (myResponse.userExistsAndApproved == "userapproved") {
                                    alert("You are a valid user. Proceed to login!")
                                    window.location.assign("/api/auth/login")
                                }
                            }
                        }
                        setOpenModal(true);
                  
                      } catch (error) {
                            console.error('Error fetching the email of this user:', error);
                      } finally {
                        //setLoading(false);
                      }
                    setOpenModal(false);
                }}>Proceed</Button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
    else {
        return (
            <div className="flex items-center space-x-1">
            <a href="/api/auth/logout" className="py-2 px-3 bg-blue-400 hover:bg-blue-300 text-blue-900 hover:text-blue-800 rounded">Logout</a>
            </div>
        )
    }
}
export default function NavBar() {
    return (
    <nav>
        {/* <img className="h-auto max-w-full" src="/app/imgs/Logo.png" alt="image"> */}
        {/* <img className="w-[204px] h-[84px]" src="logo1/Logo.png" /> */}
        
        {/* Nav bar */}

        <nav className="bg-red-100">
            {/* to indent: max-w-5xl */}
            <div className="px-4 mx-auto">
                <div className="flex justify-between">
                    <div className="flex space-x-4">

                        {/* logo */}
                        {/* <div className="mr-4">
                            <a href="#" className="flex items-center py-5 px-3 text-gray-700">
                                <svg className="h-6 w-6 mr-1 text-red" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <span className="font-bold">Five Star Souvenirs</span>
                            </a>
                        </div> */}

                        {/* Primary Nav */}
                        
                        <MainLinks />
                    </div>

                    <AuthenticationButtons />

                    {/* mobile button here */}
                    {/* <div class="md:hidden flex items-center">
                        mobile thing
                    </div> */}

                </div>

            </div>

            {/* mobile menu */}
            {/* <div class="">
                <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">order</a>
                <a href="#" class="block">ya</a>
            </div> */}
        </nav>
        

        
    </nav>
    )
   
}