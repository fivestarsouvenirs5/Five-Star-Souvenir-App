
'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { Plus } from "lucide-react";
import { useUser } from '@auth0/nextjs-auth0/client';



export default function AddCategoryButton({ location, admin }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    async function addCatg({ location }) {
        // const categoryName = document.getElementById('newCategoryName').value;
        // const response = await fetch('/api/addCatg', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ name: categoryName, newLocation: location, })
        // });
        // if (!response.ok) {
        //     console.log("Problem adding category");
        // }
        const categoryName = document.getElementById('newCategoryName').value;
        
        var formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("name", categoryName)
            formData.append("newLocation", location)
                

        var response = await fetch('/api/addCatg', {
            method: 'POST',
            body: formData
        });
        var responseData = await response.json();
        return responseData.category_id;
            
    }

    if (user && admin) {
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);
        };
        return (
            <div className=''>
              <button
                onClick={() => setOpenModal(true)}
                className="
                    flex items-center gap-1
                    px-4 py-1
                    font-medium
                    rounded-md
                    bg-primary
                    text-white
                    hover:bg-primary-light hover:text-text-dark
                    transition-colors
                "
                >
                <Plus className="w-4 h-4" />
                Cat
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>New Category</Modal.Header>
                    <Modal.Body>
                        <div>
                                <label>Upload Category Image: </label>
                                <input type="file" onChange={handleFileChange} accept="image/*"></input>
                        </div>
                        <br></br>
                        <label>Category Name: </label>
                        <input type="text" id="newCategoryName"></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            disabled={loading} // Disable button while loading
                            onClick={async () => {
                                setLoading(true); // Set loading to true when clicked
                                await addCatg({ location });
                                setOpenModal(false);
                                setLoading(false); // Reset loading after request is done
                                window.location.reload();
                            }}
                        >
                            {loading ? "Processing..." : "Add"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}
