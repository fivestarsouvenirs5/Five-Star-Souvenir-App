'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import { useUser } from '@auth0/nextjs-auth0/client';

async function addSubCatg({category}) {
    const subcategoryName = document.getElementById('newSubCategoryName').value;
    const response = await fetch('/api/addSubCatg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: subcategoryName, mainCatgID: category.category_id, mainCatgName: category.category})
    });
    if (!response.ok) {
        console.log("Problem adding category");
    }
    
}


export default function AddSubCategoryButton ({category, admin}) {
    const {user} = useUser();
    const [openModal, setOpenModal] = useState(false);
    if (user && admin && category.category_location == 1) {
        return (
            <div>
                <button className="border-b-2" onClick={() => setOpenModal(true)}> 
                  Add new SubCategory
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>New SubCategory</Modal.Header>
                <Modal.Body>
                    <label>SubCategory Name: </label>
                    <input type="text" id="newSubCategoryName"></input>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => {
                    addSubCatg({category})
                    setOpenModal(false);
                    window.location.reload()
                  }}>Add</Button>
                </Modal.Footer>
              </Modal>
            </div>
        )
    }
    else {
        return(
            <div></div>
        )
    }
    
    
}