'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import {useState} from 'react';
import { Button, Modal } from 'flowbite-react';

export default function AuthenticationButtons() {
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
                        
                        //console.log(response.status);
                        const myResponse = await response.json();
                        //console.log(myResponse);
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
                                    alert("You are not a valid user. You must wait for admin approval.");
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