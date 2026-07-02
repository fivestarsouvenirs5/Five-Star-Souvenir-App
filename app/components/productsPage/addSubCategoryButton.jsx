
'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Plus } from "lucide-react";

async function addSubCatg({ category }) {
    const subcategoryName = document.getElementById('newSubCategoryName').value;
    const response = await fetch('/api/addSubCatg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: subcategoryName, mainCatgID: category.category_id, mainCatgName: category.category })
    });
    if (!response.ok) {
        console.log("Problem adding category");
    }
}

export default function AddSubCategoryButton({ category, admin }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    if (user && admin && category.category_location === 1) {
        return (
            <div>
            
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
                                   SubCat
                                   </button>
          
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>New SubCategory</Modal.Header>
                    <Modal.Body>
                        <label>SubCategory Name: </label>
                        <input type="text" id="newSubCategoryName"></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={async () => {
                                setLoading(true); // Set loading to true when clicked
                                await addSubCatg({ category });
                                setOpenModal(false);
                                setLoading(false); // Reset loading after request is done
                                window.location.reload();
                            }}
                            disabled={loading} // Disable button while loading
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
