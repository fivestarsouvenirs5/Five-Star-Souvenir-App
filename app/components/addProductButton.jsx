'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useUser } from '@auth0/nextjs-auth0/client';

async function addProduct({ category, subcategory, file }) {
    const productName = document.getElementById('newProductName').value;
    const productPrice = parseFloat(document.getElementById('newProductPrice').value);
    const productStock = document.getElementById('newProductStock').value;
    const productCell = document.getElementById('newProductCell').value;
    var sID;
    var sName;
    if (subcategory !== null){
        sID = subcategory.subcategory_id;
        sName = subcategory.subcategory_name;
    }
    else {
        sID = null;
        sName = null;
    }

    try {
        // Read the contents of the file as Base64-encoded data
        const fileContents = await readFileAsBase64(file);

        // Send product details and file contents to the server
        const response = await fetch('/api/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: productName,
                price: productPrice,
                stock: productStock,
                cell: productCell,
                productCatgID: category.category_id,
                productCatgName: category.category,
                productSubCatgID: sID,
                productSubCatgName: sName,
                file: fileContents, // Include the file contents in the request
            }),
        });

        if (!response.ok) {
            console.log('Problem adding product');
        } else {
            console.log('Product added successfully');
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Function to read file as Base64-encoded data
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result.split(',')[1]); // Extract Base64 data from Data URL
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

export default function AddProductButton({ category, subcategory }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    if (user) {
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);
        };
    
        return (
            <div>
                <button className="border-b-2" onClick={() => setOpenModal(true)}>
                    Add New Product
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>New Product</Modal.Header>
                    <Modal.Body>
                        <div className="flex justify-between">
                            <div>
                                <label>Upload Product Image: </label>
                                <input type="file" onChange={handleFileChange}></input>
                            </div>
                            <div>
                                <label>Product Name: </label>
                                <input type="text" id="newProductName"></input>
                                <label>Price: *in cents*</label>
                                <input type="number" id="newProductPrice"></input>
                                <label>Stock *Please write &apos;In Stock&apos; or a custom message: </label>
                                <input type="text" id="newProductStock"></input>
                                <label>Is this a clothing item? </label>
                                <input type="checkbox" id="clothing?"></input>
                                <br></br>
                                <label>What is the cell in the order form that corresponds to this item? </label>
                                <input type="text" id="newProductCell"></input>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                addProduct({ category, subcategory, file: selectedFile });
                                setOpenModal(false);
                                window.location.reload();
                            }}
                        >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    else {
        return <div></div>
    }
    
}
