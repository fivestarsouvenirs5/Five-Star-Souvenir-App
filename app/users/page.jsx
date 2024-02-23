'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';

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
    console.log(myResponse);
    console.log(myResponse.email);
    //console.log(myResponse);
    if (!response.ok) {
        alert("Was not able to get unapproved users");
        throw new Error('Failed to fetch the email of this user');
    }
    else {
        alert("Getting users was successful!");
    }
    // else {
        
    // }
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
    console.log(myResponse);
    console.log(myResponse.email);
    //console.log(myResponse);
    if (!response.ok) {
        alert("Was not able to get unapproved users");
        throw new Error('Failed to fetch the email of this user');
    }
    else {
        alert("Getting users was successful!");
    }
    // else {
        
    // }
    //setOpenModal(true);

  } catch (error) {
        console.error('Error fetching unapproved users:', error);
  } finally {
    //setLoading(false);
  }
}

export default function users() {
    return (
      <div>
        <h1>Users Page</h1>
        <Button onClick={() => {
            forApprovedUser()
            //window.location.reload()
          }}>Get Approved Users</Button>
        <Button onClick={() => {
            forUnapprovedUser()
            //window.location.reload()
          }}>Get Unapproved Users</Button>
      </div>
      
    )
}