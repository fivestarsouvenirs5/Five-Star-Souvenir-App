'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AddProductButton({ category, subcategory, admin }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [cellValid, setCellValid] = useState(true);

    if (user && admin) {
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);
        };
        const isValidCell = (cell) => {
            const cellRegex = /^[A-Z]+\d*$/; // Any number of capital letters followed by any number of digits
            return cellRegex.test(cell);
        };

        const handleCellChange = (event) => {
            const cellValue = event.target.value;
            // Convert the input value to uppercase
            event.target.value = cellValue.toUpperCase();
            // Check cell validity and update state
            setCellValid(isValidCell(cellValue));
        };

        const addProduct = async () => {
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
        
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("name", productName)
            formData.append("price", productPrice)
            formData.append("stock", productStock)
            formData.append("cell", productCell)
            formData.append("productCatgID", category.category_id)
            formData.append("productCatgName", category.category)
            formData.append("productSubCatgID", sID)
            formData.append("productSubCatgName", sName)

            const response = await fetch('/api/addProduct', {
                method: 'POST',
                body: formData
            });
        }
    
        return (
            <div>
                <div className='className="bg-gray-200 border p-4 w-64"'>
                <button className="border-b-2 text-lg font-bold " onClick={() => setOpenModal(true)}>
                    Add New Product
                </button>
                </div>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>New Product</Modal.Header>
                    <Modal.Body>
                        <div className="flex justify-between">
                            <div>
                                <label>Upload Product Image: </label>
                                <input type="file" onChange={handleFileChange} accept="image/*"></input>
                            </div>
                            <div>
                                <div className='ml-[-80px]'>
                                <label className='font-bold'>Product Name: </label>
                                <input type="text" id="newProductName"></input>
                                <br></br>
                                <br></br>

                                <label className='font-bold'>Price (¢): </label>
                                <input type="number" id="newProductPrice"></input>
                                <br></br>
                                <br></br>

                                <label className='font-bold'>Stock *Please write &apos;In Stock&apos; or a custom message: </label>
                                <input type="text" id="newProductStock"></input>
                                <br></br>
                                <br></br>

                                <label className='font-bold'>Is this a clothing item? </label>
                                <input type="checkbox" id="clothing?"></input>
                                <br></br>
                                <br></br>

                                <label className='font-bold'>What is the cell in the order form that corresponds to this item? </label>
                                <input
                                    type="text"
                                    id="newProductCell"
                                    onChange={handleCellChange}
                                />
                                {!cellValid && <span style={{ color: 'red' }}>Invalid cell format. Please enter capital letters followed by digits.</span>}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                addProduct();
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
