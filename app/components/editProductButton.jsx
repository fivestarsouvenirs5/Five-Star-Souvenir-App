

'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function EditProductButton({ product, admin }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [cellValid, setCellValid] = useState(true);
    const [isFeatured, setIsFeatured] = useState(product.featured_product === 1);
    const [loading, setLoading] = useState(false);

    async function editProduct() {
        var productName = document.getElementById('newProductName').value;
        var productPrice = document.getElementById('newProductPrice').value;
        var productStock = document.getElementById('newProductStock').value;
        var productCell = document.getElementById('newProductCell').value;
        var productQty = document.getElementById('newProductQty').value;

        if (productQty === "None" || productQty === "0") {
            productQty = null;
        }

        if (productName === "") {
            productName = product.product_name;
        }
        if (productPrice === "") {
            productPrice = product.price;
        }
        if (productStock === "") {
            productStock = product.in_stock;
        }
        if (productCell === "") {
            productCell = product.order_form_cell;
        }

        var formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", productName);
        formData.append("price", productPrice);
        formData.append("stock", productStock);
        formData.append("cell", productCell);
        formData.append("oldProductID", product.product_id);
        formData.append("oldProductCatgID", product.category_id);
        formData.append("oldProductSubCatgID", product.subcategory_id);
        formData.append("image", product.image_id);
        formData.append("featured", isFeatured ? 1 : 0);  // Add featured status
        formData.append("qty", productQty);


        const response = await fetch('/api/editProduct', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            console.log("Problem editing product");
        }
    }

    if (user && admin && product.clothing_size_id !== 1) {

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

        var qty = "None";
        if(product.set_qty !== null && product.set_qty > 0) {
            var qty = product.set_qty;
        }
        return (
            <div>
                <button className="bg-blue-500 text-white px-2 py-1 rounded-md mb-4" onClick={() => setOpenModal(true)}>
                    Edit 
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Product {product.product_name}</Modal.Header>
                    <Modal.Body>
                        <div className="flex justify-between">
                            <div>
                                <label>Upload New Image: <br></br> (leave empty if you want to keep) </label>
                                <input type="file" onChange={handleFileChange} accept="image/*"></input>
                            </div>
                            <div>
                                <div className='ml-[-80px]'>
                                    <label className='font-bold'>Product Name: </label>
                                    <input type="text" id="newProductName" placeholder={product.product_name}></input>
                                    <br></br>
                                    <br></br>

                                    <label className='font-bold'>Price (¢): </label>
                                    <input type="number" id="newProductPrice" placeholder={product.price}></input>
                                    <br></br>
                                    <br></br>

                                    <label className='font-bold'>Stock: </label>
                                    <input type="text" id="newProductStock" placeholder={product.in_stock}></input>
                                    <br></br>
                                    <br></br>

                                     <label className='font-bold'>Set Quantity: </label>
                                    <input type="text" id="newProductQty" placeholder={qty}></input>
                                    <br></br>
                                    <br></br>

                                    <label className='font-bold'>Is this a featured product? </label>
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                    />
                                    <br></br>
                                    <br></br>

                                    <label className='font-bold'>Order Cell: </label>
                                    <input
                                        type="text"
                                        id="newProductCell"
                                        onChange={handleCellChange}
                                        placeholder={product.order_form_cell}
                                    />
                                    {!cellValid && <span style={{ color: 'red' }}>Invalid cell format. Please enter capital letters followed by digits.</span>}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={async () => {
                            setLoading(true)
                            await editProduct();
                            setOpenModal(false);
                            setLoading(false);
                            window.location.reload();
                        }}>{loading ? "Processing..." : "Confirm"}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

