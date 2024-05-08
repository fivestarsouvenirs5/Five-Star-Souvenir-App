'use client'
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { formatCurrencyString } from 'use-shopping-cart';


export default function EditClothingButton({product, admin}) {
    const {user} = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [cellValid, setCellValid] = useState(true);
    const [sizes, setSizes] = useState([]);
    const [openSizesModal, setOpenSizesModal] = useState(false);


    useEffect(() => {
        async function fetchSizes() {
          try {
            const response = await fetch(`/api/getSizes`, {
                method: 'POST',
                body: JSON.stringify({productID: product.product_id}),
            });
            if (response.ok) {
              const sizesData = await response.json();
              setSizes(sizesData); // Update the sizes state with fetched data
            } else {
              console.error('Failed to fetch sizes');
            }
          } catch (error) {
            console.error('Error fetching sizes:', error);
          }
        }
    
        fetchSizes();
      }, [product.product_id]);

      const EditSizeButton = ({size}) => {
        return (
            <div>
            <button onClick={() => setOpenSizesModal(true)}>✏️</button>
            <Modal show={openSizesModal} onClose={() => setOpenSizesModal(false)}>
            <Modal.Header>Edit Size Entry.</Modal.Header>
            <Modal.Body>
        
                        <div >

                        <label className='font-bold'>Size </label>
                        <input type="text" id="newClotheSize" placeholder={size.size}></input>
                        <br></br>
                        <br></br>

                        <label className='font-bold'>Price (¢): </label>
                        <input type="number" id="newClothePrice" placeholder={size.price}></input>
                        <br></br>
                        <br></br>
    

                        <label className='font-bold'>Cell </label>
                        <input
                            type="text"
                            id="newClotheCell"
                            placeholder={size.clothing_order_form_cell}

                        />
                        {!cellValid && <span style={{ color: 'red' }}>Invalid cell format. Please enter capital letters followed by digits.</span>}
                        </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        addSize();
                    setOpenSizesModal(false);
                    setOpenClothesModal(true);
                    }}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
        )
      }
    const SizeTable = () => {
        
        return (
            <div>
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
                       <td> <EditSizeButton size={size} /></td>
                    </tr>
                    
                ))}
            </tbody>
        </table>
            
        </div>
    )
    }

    async function editProduct() {
        var productName = document.getElementById('newProductName').value;
        var productStock = document.getElementById('newProductStock').value;
    
        if (productName === "") {
            productName = product.product_name;
        }
        if (productPrice === "") {
            productPrice = product.price
        }
        if (productStock === "") {
            productStock = product.in_stock;
        }
        if (productCell === "") {
            productCell = product.order_form_cell;
        }

    
        var formData = new FormData();
        formData.append("name", productName)
        formData.append("stock", productStock)
        formData.append("oldProductID", product.product_id);
        formData.append("oldProductCatgID", product.category_id);
        formData.append("oldProductSubCatgID", product.subcategory_id);
    
        const response = await fetch('/api/editClothing', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            console.log("Problem editing product");
        }
        
    }

    if (user && admin && product.clothing_size_id === 1) {

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
        return (
            <div >
                <  button className="bg-blue-500 text-white px-2 py-1 rounded-md mb-4"  onClick={() => setOpenModal(true)}>
                    Edit 
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Product {product.product_name}</Modal.Header>
                <Modal.Body>
                <div className="flex justify-between">
                            <div>
                                <label>Upload New Image: <br></br> (leave empty if you want to keep) </label>
                                <input type="file" onChange={handleFileChange} accept="image/*"></input>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <SizeTable />
                            </div>
                            <div>
                                <div className='ml-[-80px]'>
                                <label className='font-bold'>Product Name: </label>
                                <input type="text" id="newProductName" placeholder={product.product_name}></input>
                                <br></br>
                                <br></br>

                                <label className='font-bold'>Stock: </label>
                                <input type="text" id="newProductStock" placeholder={product.in_stock}></input>
                                <br></br>
                                <br></br>

                                </div>
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => {
                     editProduct();
                    setOpenModal(false);
                  }}>Add</Button>
                </Modal.Footer>
              </Modal>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
    
    
}