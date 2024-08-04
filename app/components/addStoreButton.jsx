'use client'
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Modal } from 'flowbite-react';
import { escape } from 'he';

async function addStore({ id1, newName, newStreet, newCity, newState, newZip }) {
    const response = await fetch('/api/addStore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newId: id1, newName: newName, 
                                            newStreet: newStreet, 
                                            newCity: newCity, 
                                            newState: newState, 
                                            newZip: newZip })
    });

    if (!response.ok) {
        console.log("Problem adding store");
    }
}

// function sanitizeInput(input) {
//     return escape(input);
// }

export default function AddStoreButton({ id1 }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [newStoreName, setNewStoreName] = useState('');
    const [newStoreStreet, setNewStoreStreet] = useState('');
    const [newStoreCity, setNewStoreCity] = useState('');
    const [newStoreState, setNewStoreState] = useState('');
    const [newStoreZip, setNewStoreZip] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        // only letters and apostrophes
        if (/^[a-zA-Z' ]*$/.test(value)) {
            setNewStoreName(value);
        }
    };

    const handleStreetChange = (event) => {
        const value = event.target.value;
        // letters, numbers, dashes, apostrophes, and spaces
        if (/^[a-zA-Z0-9\-\'\s]*$/.test(value)) {
            setNewStoreStreet(value);
        }
    };
    

    const handleCityChange = (event) => {
        const value = event.target.value;
        // only letters
        if (/^[a-zA-Z ]*$/.test(value)) {
            setNewStoreCity(value);
        }
    };

    const handleStateChange = (event) => {
       // console.log(event.target.value);
        if (event.target.value === '') {
            setNewStoreState("New Jersey");
        }
        else {
            setNewStoreState(event.target.value);
        }
        
    };

    const handleZipChange = (event) => {
        const value = event.target.value;
        // Validate 5 digit numbers
        if (/^\d{0,5}$/.test(value)) {
            setNewStoreZip(value);
        }
    };

    const isFormValid = () => {
        return newStoreName.trim() !== '' &&
            newStoreStreet.trim() !== '' &&
            newStoreCity.trim() !== '' &&
            newStoreState.trim() !== '' &&
            newStoreZip.trim() !== '';
    };

    const [loading, setLoading] = useState(false);

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
                                    <td><input type="text" id="newStoreName" value={newStoreName} onChange={handleNameChange}></input></td>
                                </tr>
                                <tr>
                                    <td>Street: </td>
                                    <td><input type="text" id="newStoreStreet" value={newStoreStreet} onChange={handleStreetChange}></input></td>
                                </tr>
                                <tr>
                                    <td>City: </td>
                                    <td><input type="text" id="newStoreCity" value={newStoreCity} onChange={handleCityChange}></input></td>
                                </tr>
                                <tr>
                                    <td>State: </td>
                                    <td>
                                        <select id="newStoreState" value={newStoreState} onChange={handleStateChange}>
                                            <option value="" disabled>--</option>
                                            <option value="New Jersey">New Jersey</option>
                                            <option value="New York">New York</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Zip Code: </td>
                                    <td><input type="text" id="newStoreZip" value={newStoreZip} onChange={handleZipChange}></input></td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={async () => {
                            setLoading(true);
                            await addStore({ id1, newName: newStoreName, newStreet: newStoreStreet, newCity: newStoreCity, newState: newStoreState, newZip: newStoreZip });
                            setOpenModal(false);
                            setLoading(false);
                            window.location.reload();
                        }}
                        disabled={!isFormValid()}
                        >{loading ? 'Processing...' : 'Add'}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    } else {
        return <div></div>;
    }
}