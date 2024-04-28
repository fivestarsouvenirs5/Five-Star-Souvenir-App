'use client'
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Modal } from 'flowbite-react';
import { escape } from 'he';

async function addStore({ id1 }) {
    const storeNameInput = document.getElementById('newStoreName');
    const storeStreetInput = document.getElementById('newStoreStreet');
    const storeCityInput = document.getElementById('newStoreCity');
    const storeZipInput = document.getElementById('newStoreZip');

    
    
    const storeStateInput = "New Jersey";
    // console.log(document.getElementById('newStoreState'));


    // Sanitize input
    const storeName = sanitizeInput(storeNameInput.value);
    const storeStreet = sanitizeInput(storeStreetInput.value);
    const storeCity = sanitizeInput(storeCityInput.value);
    const storeState = sanitizeInput("New Jersey");
    const storeZip = sanitizeInput('07643');

    const response = await fetch('/api/addStore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newId: id1, newName: storeName, 
                                            newStreet: storeStreet, 
                                            newCity: storeCity, 
                                            newState: storeState, 
                                            newZip: storeZip })
    });

    if (!response.ok) {
        console.log("Problem adding store");
    }

    // console.log(response);
}

// Function to sanitize user input
function sanitizeInput(input) {
    return escape(input);
}

export default function AddStoreButton({ id1 }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);
    // const [selectedState, setSelectedState] = useState('');

    // const handleStateChange = (event) => {
    //     setSelectedState(event.target.value);
    // };

    if (user) {
        return (
            <div className='bg-gray-200 border p-4 w-64'>
                <button className="border-b-2 text-lg font-bold " onClick={() => setOpenModal(true)}>
                    Add new Store
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Add New Store</Modal.Header>
                    <Modal.Body>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Store Name: </td>
                                    <td><input type="text" id="newStoreName"></input></td>
                                </tr>
                                <tr>
                                    <td>Street: </td>
                                    <td><input type="text" id="newStoreStreet"></input></td>
                                </tr>
                                <tr>
                                    <td>City: </td>
                                    <td><input type="text" id="newStoreCity"></input></td>
                                </tr>
                                <tr>
                                    <td>State: </td>
                                    <td>
                                        <select id="newStoreState">
                                            <option value="new jersey">New Jersey</option>
                                            <option value="new york">New York</option>
                                        </select>
                                    </td>
                                    {/* <td><input type="text" id="newStoreAddress"></input></td> */}
                                </tr>
                                <tr>
                                    <td>Zip Code: </td>
                                    <td><input type="text" id="newStoreZip"></input></td>
                                </tr>
                            </tbody>
                        </table>

                        {/* <div className="flex flex-col">
                            <div className="space-x-4">
                                <label>Store Name:</label>
                                <input type="text" id="newStoreName"></input>
                            </div>
                            <div className="space-x-4 space-y-4">
                                <label>Store Street:</label>
                                <input type="text" id="newStoreAddress"></input>
                            </div>
                            <div className="space-x-4 space-y-4">
                                <label>Store City:</label>
                                <input type="text" id="newStoreAddress"></input> 
                            </div>
                        </div> */}

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
