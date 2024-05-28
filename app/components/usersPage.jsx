'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';

async function forApprovedUser() {
  try {
    //setLoading(true);
    const response = await fetch('/api/approvedUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({helloMessage: 'uselessMessageForBody'})
    });
    
    //console.log(response.status);
    const myResponse = await response.json();
    // console.log(myResponse);
    // console.log(myResponse[0].user_metadata.phonenumber);
    // console.log(myResponse[0].email);
    // if (!response.ok) {
    //     alert("Was not able to get unapproved users");
    //     throw new Error('Failed to fetch the email of this user');
    // }
    // else {
    //     alert("Getting users was successful!");
    // }
    return myResponse;
    
    //setOpenModal(true);

  } catch (error) {
        console.error('Error fetching unapproved users:', error);
  } finally {
    //setLoading(false);
  }
}

async function forUnapprovedUser() {
  try {
    //setLoading(true);
    const response = await fetch('/api/unapprovedUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({helloMessage: 'uselessMessageForBody'})
    });
    
    //console.log(response.status);
    const myResponse = await response.json();
    // console.log(myResponse);
    // console.log(myResponse.email);
    //console.log(myResponse);
    // if (!response.ok) {
    //     alert("Was not able to get unapproved users");
    //     throw new Error('Failed to fetch the email of this user');
    // }
    // else {
    //     alert("Getting users was successful!");
    // }
    return myResponse;
    //setOpenModal(true);

  } catch (error) {
        console.error('Error fetching unapproved users:', error);
  } finally {
    //setLoading(false);
  }
}
const UsersPage = () => {
    const [displayContent, setDisplayContent] = useState(null);
        const [openModal, setOpenModal] = useState(false);
        const [refresh, setRefresh] = useState(false);

        useEffect(() => {
        const fetchData = async () => {
            try {
            const approved = await forApprovedUser();
            const unapproved = await forUnapprovedUser();

            setDisplayContent(
                <>

                {/* unapproved users table */}
                <div className="flex m-10">
                    <h1 m-10>Unapproved Users:</h1>
                    <div className="flex-grow ml-5">
                        <table className="w-full table-auto border-separate border-spacing-5 border border-slate-400 ml-2 mb-2">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Phone Number</th>
                            </tr>
                            </thead>
                        {unapproved.map((user, index) => (
                            <tbody key={index}>
                                <tr className="bg-gray-50">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.user_metadata.phonenumber}</td>
                                <td>
                                    <Button className='py-2 px-3 bg-green-400 hover:bg-green-300 text-white-900 hover:text-white-800 rounded' onClick={async() => {
                                    var useremail = user.email;
                                    // console.log(useremail);

                                    try {
                                        const response = await fetch('/api/approvingUser', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({useremail})
                                        });

                                        const myResponse = await response.json();

                                        if (!response.ok) {
                                        alert("This is an incorrect email.");
                                        throw new Error('Failed to fetch the email of this user');
                                        }
                                        else {
                                        if (myResponse.noUserMessage == "usernotfound") {
                                            alert("It seems that you are not registered. Please make sure there are not typos in the email or go to signup to register.");
                                            setRefresh(!refresh);
                                        }
                                        else {
                                            if (myResponse.userMetadataUpdated == "userapproved") {
                                    
                                            setRefresh(!refresh);
                                            window.location.assign("/users");
                                            }
                                            else if (myResponse.userMetadataNotUpdated == "userstillunapproved") {
                               
                                            setRefresh(!refresh);
                                            window.location.assign("/users")
                                            }
                                        }
                                        }
                                    } catch (error) {
                                        console.error('Error fetching the email of this user:', error);
                                    } finally {

                                    }
                                    }}>Approve</Button>
                                
                                    {/* <Button className='py-2 px-3 bg-green-400 hover:bg-green-300 text-white-900 hover:text-white-800 rounded'>Approve</Button> */}
                                    {/* <button className="py-2 px-3 bg-green-400 hover:bg-green-300 text-white-900 hover:text-white-800 rounded"> Approve</button> */}
                                </td>
                                <td>
                                    <Button className='py-2 px-3 bg-red-400 hover:bg-red-300 text-white-900 hover:text-white-800 rounded' onClick={async () => {
                                    var useremail = user.email;
                                    // console.log(useremail)

                                    try {
                                        const response = await fetch('/api/deletingUser', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({useremail})
                                        });

                                        const myResponse = await response.json();

                                        if (!response.ok) {
                                        alert("This is an incorrect email.");
                                        throw new Error('Failed to fetch the email of this user');
                                        }
                                        else {
                                        if (myResponse.noUserMessage == "usernotfound") {
                                            alert("It seems that you are not registered. Please make sure there are no typos in the email or go to signup to register.");
                                            setRefresh(!refresh);
                                        }
                                        else {
                                            if (myResponse.userDeleted == "userdeleted") {
                                            setRefresh(!refresh);
                                            window.location.assign("/users");
                                            }
                                            else if (myResponse.userNotDeleted == "usernotdeleted") {
                                            alert("User did not get deleted properly :(")
                                            setRefresh(!refresh);
                                            window.location.assign("/users")
                                            }
                                        }
                                        }
                                    } catch (error) {
                                        console.error('Error fetching the email of this user:', error);
                                    } finally {
                                        //idk
                                    }
                                    }}>Delete</Button>
                                    {/* <Button className='py-2 px-3 bg-red-400 hover:bg-red-300 text-white-900 hover:text-white-800 rounded'>Deny/Delete</Button> */}
                                </td>
                                </tr>
                            </tbody>
                            ))}
                        </table>
                    </div>
                </div>

                {/* approved users table */}
                <div className="flex m-10">
                    <h1 m-10>Approved Users:</h1>
                    <div className="flex-grow ml-10">
                        <table className="w-full table-auto border-separate border-spacing-5 border border-slate-400m ml-2 mb-2">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Phone Number</th>
                            </tr>
                            </thead>
                            {approved.map((user, index) => (
                            <tbody key={index}>
                                <tr className="bg-gray-50">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.user_metadata.phonenumber}</td>
                                <td>
                                    <Button className='py-2 px-3 bg-red-400 hover:bg-red-300 text-white-900 hover:text-white-800 rounded' onClick={async () => {
                                    var useremail = user.email;
                                    // console.log(useremail)

                                    try {
                                        const response = await fetch('/api/deletingUser', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({useremail})
                                        });

                                        const myResponse = await response.json();

                                        if (!response.ok) {
                                        alert("This is an incorrect email.");
                                        throw new Error('Failed to fetch the email of this user');
                                        }
                                        else {
                                        if (myResponse.noUserMessage == "usernotfound") {
                                            alert("It seems that you are not registered. Please make sure there are no typos in the email or go to signup to register.");
                                            setRefresh(!refresh);
                                        }
                                        else {
                                            if (myResponse.userDeleted == "userdeleted") {
                                  
                                            setRefresh(!refresh);
                                            window.location.assign("/users");
                                            }
                                            else if (myResponse.userNotDeleted == "usernotdeleted") {
                                            alert("User did not get deleted properly :(")
                                            setRefresh(!refresh);
                                            window.location.assign("/users")
                                            }
                                        }
                                        }
                                    } catch (error) {
                                        console.error('Error fetching the email of this user:', error);
                                    } finally {
                                        //idk
                                    }
                                    }}>Delete</Button>
                                    {/* <Button className='py-2 px-3 bg-red-400 hover:bg-red-300 text-white-900 hover:text-white-800 rounded'>Delete</Button> */}
                                </td>
                                </tr>
                                
                            </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </>
            );
            } catch (error) {
            console.error('Error handling click:', error);
            }
        };
        fetchData();
        }, []);

        return (
            <div>        
            <h1 className="flex justify-center p-6 text-2xl font-bold">Users Page</h1>
            {displayContent}
            </div>
            
        )
}
export default UsersPage