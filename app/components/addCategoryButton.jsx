// 'use client'
// import React from 'react'
// import { Button, Modal } from 'flowbite-react';
// import { useState } from 'react';
// import { useUser } from '@auth0/nextjs-auth0/client';

// async function addCatg({location}) {
//     const categoryName = document.getElementById('newCategoryName').value;
//     const response = await fetch('/api/addCatg', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name: categoryName, newLocation: location,})
//     });
//     if (!response.ok) {
//         console.log("Problem adding category");
//     }
    
// }


// export default function AddCategoryButton ({location, admin}) {
//     const {user} = useUser();
//     const [openModal, setOpenModal] = useState(false);
//     if (user && admin) {
//         return (
//             <div className='className="bg-gray-200 border p-4 w-64"'>
//                 <  button className="border-b-2 text-lg font-bold " onClick={() => setOpenModal(true)}>
//                     Add new Category
//                 </button>
//                 <Modal show={openModal} onClose={() => setOpenModal(false)}>
//                 <Modal.Header>New Category</Modal.Header>
//                 <Modal.Body>
//                     <label>Category Name: </label>
//                     <input type="text" id="newCategoryName"></input>
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button onClick={async () => {
//                     await addCatg({location})
//                     setOpenModal(false);
//                     window.location.reload()
//                   }}>Add</Button>
//                 </Modal.Footer>
//               </Modal>
//             </div>
//         )
//     }
//     else {
//         return (
//             <div></div>
//         )
//     }
    
    
// }

'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useUser } from '@auth0/nextjs-auth0/client';

async function addCatg({ location }) {
    const categoryName = document.getElementById('newCategoryName').value;
    const response = await fetch('/api/addCatg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: categoryName, newLocation: location, })
    });
    if (!response.ok) {
        console.log("Problem adding category");
    }
}

export default function AddCategoryButton({ location, admin }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    if (user && admin) {
        return (
            <div className='className="bg-gray-200 border p-4 w-64"'>
                <button className="border-b-2 text-lg font-bold " onClick={() => setOpenModal(true)}>
                    Add new Category
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>New Category</Modal.Header>
                    <Modal.Body>
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
