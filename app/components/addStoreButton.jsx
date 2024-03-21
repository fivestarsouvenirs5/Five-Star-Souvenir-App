'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

async function addStore({id1}) {
    const storeName = document.getElementById('newStoreName').value;
    const storeAddress = document.getElementById('newStoreAddress').value;
    const response = await fetch('/api/addStore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newId: id1, newName: storeName, newAddress: storeAddress,})
    });
    if (!response.ok) {
        console.log("Problem adding store");
    }
    
}


export default function AddStoreButton ({id1}) {
    const {user} = useUser();
    const [openModal, setOpenModal] = useState(false);
    if (user) {
        return (
            <div className='className="bg-gray-200 border p-4 w-64"'>
                <button className="border-b-2 text-lg font-bold " onClick={() => setOpenModal(true)}>
                    Add new Store
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>New Store</Modal.Header>
                <Modal.Body>
                    <label>Store Name: </label>
                    <input type="text" id="newStoreName"></input>
                    
                    <label>Store Address: </label>
                    <input type="text" id="newStoreAddress"></input>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => {
                    addStore({id1})
                    setOpenModal(false);
                    window.location.reload()
                  }}>Add</Button>
                </Modal.Footer>
              </Modal>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}