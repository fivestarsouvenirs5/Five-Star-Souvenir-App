'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import UserCard from './userCard';
import { RefreshCw } from "lucide-react";

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

                const app = await forApprovedUser();
                const unapp = await forUnapprovedUser();
                                
                setUnapprovedUsers(unapp);
                setApprovedUsers(app);

                setLoading(false)
               
            }
     
             loadData()
             
        }, [refresh])

        return (
            <>
                <h1 className="text-3xl text-center text-secondary-dark font-bold p-7">Users</h1>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-8 pb-4 gap-3">

            
                  <div className="flex flex-wrap gap-4 text-sm sm:text-base text-gray-700">
                      <p>
                          <span className="font-semibold">Total:</span>{" "}
                          {approvedUsers.length + unapprovedUsers.length}
                      </p>

                      <p>
                          <span className="font-semibold text-green-600">Approved:</span>{" "}
                          {approvedUsers.length}
                      </p>

                      <p>
                          <span className="font-semibold text-destructive">Unapproved:</span>{" "}
                          {unapprovedUsers.length}
                      </p>
                  </div>

                  <button
                      onClick={() => setRefresh(prev => !prev)}
                      disabled={loading}
                      className="bg-primary text-white p-2 rounded-md hover:opacity-80 transition disabled:opacity-50"
                      title="Refresh users"
                  >
                      <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                  </button>

              </div>
                
                {loading ? (<p className="p-6 text-lg">Loading Users...</p>) : (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-8 px-8">
                    
                   {unapprovedUsers.map((user) => (
                         <UserCard key={user.user_id} user={user} setRefresh={setRefresh}/>
                    ))}

                  

                      {approvedUsers.map((user) => (
                        <UserCard key={user.user_id} user={user} setRefresh={setRefresh}/>
                      ))}

                  </div>
                )}
            </>
        )

}
export default UsersPage;