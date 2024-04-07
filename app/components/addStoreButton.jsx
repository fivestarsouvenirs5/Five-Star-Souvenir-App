'use client'
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Modal } from 'flowbite-react';
import { escape } from 'he';

async function addStore({ id1 }) {
    const storeNameInput = document.getElementById('newStoreName');
    const storeAddressInput = document.getElementById('newStoreAddress');

    // Sanitize input
    const storeName = sanitizeInput(storeNameInput.value);
    const storeAddress = sanitizeInput(storeAddressInput.value);

    const response = await fetch('/api/addStore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newId: id1, newName: storeName, newAddress: storeAddress })
    });

    if (!response.ok) {
        console.log("Problem adding store");
    }

    console.log(response);
    console.log("hiiiiiii");
}

// Function to sanitize user input
function sanitizeInput(input) {
    return escape(input);
}

export default function AddStoreButton({ id1 }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);

    if (user) {
        return (
            <div className='bg-gray-200 border p-4 w-64'>
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
                            addStore({ id1 })
                            setOpenModal(false);
                            window.location.reload()
                        }}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    } else {
        return <div></div>;
    }
}
