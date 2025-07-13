'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { formatCurrencyString } from 'use-shopping-cart';


export default function AddProductButton({ category, subcategory, admin}) {
    const { user } = useUser();
    const [openProductModal, setOpenProductModal] = useState(false);
    const [openClothesModal, setOpenClothesModal] = useState(false);
    const [openSizesModal, setOpenSizesModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [cellValid, setCellValid] = useState(true);
    const [productID, setProductID] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);

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


        const SizeTable = () => {

            return (
                <table className="w-full table-auto border-separate border-spacing-5 border border-slate-400 mt-5 mb-5">
                <thead className="border-b-2 border-gray-200">
                    <tr>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Cell</th>
                    </tr>
                </thead>
                <tbody>
                    {sizes.map((size) => (
                        <tr key={size.size_id}>
                            <td>{size.size}</td>
                            <td>{formatCurrencyString({ value: size.price, currency: 'USD' })}</td>
                            <td>{size.clothing_order_form_cell}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
        }
        
        const addProduct = async (isClothing) => {
            const productName = document.getElementById('newProductName').value;
            const productPrice = parseFloat(document.getElementById('newProductPrice').value);
            const productStock = document.getElementById('newProductStock').value;
            const productCell = document.getElementById('newProductCell').value;
            const isFeatured = document.getElementById("featured?").checked;
            const productQty = document.getElementById('newProductQty').value;

            let featured = 0;

            if (isFeatured) {
                featured = 1
            }
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
    
            var formData = new FormData();
                formData.append("file", selectedFile)
                formData.append("name", productName)
                formData.append("price", productPrice)
                formData.append("stock", productStock)
                formData.append("cell", productCell)
                formData.append("productCatgID", category.category_id)
                formData.append("productCatgName", category.category)
                formData.append("productSubCatgID", sID)
                formData.append("productSubCatgName", sName)
                formData.append("featured", featured)
                formData.append("productQty", productQty)

                if (isClothing === "true") {
                    formData.append("clothingSize", 1)
                }
                else {
                    formData.append("clothingSize", 0)
                }
        
            

            var response = await fetch('/api/addProduct', {
                method: 'POST',
                body: formData
            });
             var responseData = await response.json();
             return responseData.product_id;
        }

        const addSize = async () => {
            const clothingSize = document.getElementById('newClotheSize').value;
            const clothingPrice = parseFloat(document.getElementById('newClothePrice').value);
            const clothingCell = document.getElementById('newClotheCell').value;

            //console.log("saved var" + productID)

            const response = await fetch('/api/addSize', {
                method: 'POST',
                body: JSON.stringify({size: clothingSize, price: clothingPrice, cell: clothingCell, product_id: productID, catgID: category.category_id })
            });

            if (response.ok) {
                const newSize = await response.json();
                //console.log("newSize: " + newSize)
                setSizes(prevSizes => [...prevSizes, newSize]); 
            }

        }
    
        return (
            <div>
                <div className='className="bg-gray-200 border p-4 w-64"'>
                <button className="border-b-2 text-lg font-bold " onClick={() => setOpenProductModal(true)}>
                    Add New Product
                </button>
                </div>
                <Modal show={openProductModal} onClose={() => setOpenProductModal(false)}>
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

                                <label className='font-bold'>Please specify a set quantity, leave blank if none: </label>
                                <input type="text" id="newProductQty"></input>
                                <br></br>
                                <br></br>

                                <label className='font-bold'>Is this a clothing item? </label>
                                <input type="checkbox" id="clothing?"></input>
                                <br></br>
                                <br></br>

                                <label className='font-bold'>Is this a featured product? </label>
                                <input type="checkbox" id="featured?"></input>
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
                            onClick={async () => {
                                var isClothes = document.getElementById("clothing?").checked;
                                
                                if (isClothes) {
                                    var id = await addProduct("true");
                                    setProductID(id);
                                    setOpenProductModal(false);
                                    setOpenClothesModal(true);
                                }
                                else {
                                    setLoading(true)
                                    await addProduct("false");
                                    setOpenProductModal(false);
                                    setLoading(false)
                                     window.location.reload();
                                } 
                              
                            }}
                        >
                            {loading ? "Processing..." : "Add"}
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* modal for adding clothes */}
                <Modal show={openClothesModal} onClose={() => setOpenClothesModal(false)}>
                    <Modal.Header>Please add sizes for the clothing item.</Modal.Header>
                    <Modal.Body>
                        <SizeTable />
                        <button onClick={ () => {
                            setOpenClothesModal(false);
                            setOpenSizesModal(true);
                        }}>+ Add</button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                               setOpenClothesModal(false);
                               window.location.reload();
                            }}
                            disabled={sizes.length === 0}
                        >
                            Done
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={openSizesModal} onClose={() => setOpenSizesModal(false)}>
                    <Modal.Header>Please fill out the information below for one size entry.</Modal.Header>
                    <Modal.Body>
                   
                                <div >

                                <label className='font-bold'>Please Enter Size: </label>
                                <input type="text" id="newClotheSize"></input>
                                <br></br>
                                <br></br>

                                <label className='font-bold'>Price (¢): </label>
                                <input type="number" id="newClothePrice"></input>
                                <br></br>
                                <br></br>

                                <label className='font-bold'>What is the cell in the order form that corresponds to this item? </label>
                                <input
                                    type="text"
                                    id="newClotheCell"
                                    onChange={handleCellChange}
                                />
                                {!cellValid && <span style={{ color: 'red' }}>Invalid cell format. Please enter capital letters followed by digits.</span>}
                                </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={async () => {
                                setLoading(true)
                                await addSize();
                               setOpenSizesModal(false);
                               setLoading(false)
                               setOpenClothesModal(true);
                            }}
                        >
                            {loading ? "Processing..." : "Add"}
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
