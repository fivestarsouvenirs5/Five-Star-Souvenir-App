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
        const [openModal, setOpenModal] = useState(false);
        const [refresh, setRefresh] = useState(false);
        const [unapprovedUsers, setUnapprovedUsers] = useState([]);
        const [approvedUsers, setApprovedUsers] = useState([]);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            const loadData = async () => {

                setLoading(true)
                
                setUnapprovedUsers(await forUnapprovedUser());
                setApprovedUsers(await forApprovedUser());

                setLoading(false)
               
            }
     
             loadData()
             
        }, [])

        return (
            <>
                <h1>User Management</h1>
                {loading ? (<p>Loading Users...</p>) : (
                <div>
                    
                   {unapprovedUsers.map((user) => (
                        <p key={user.user_id}>{user.first_name}</p>
                    ))}

                    {approvedUsers.map((user) => (
    
                        <p key={user.user_id}>{user.first_name}</p>
                        
                    ))}
                </div>)}
            </>
        )

}
export default UsersPage;