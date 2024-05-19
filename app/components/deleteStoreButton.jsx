// 'use client'
// import React from 'react'
// import { Button, Modal } from 'flowbite-react';
// import { useState } from 'react';
// import { useUser } from '@auth0/nextjs-auth0/client';

// async function deleteStore({storeId}) {
//     const response = await fetch('/api/deleteStore', {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ store_id: storeId})
//     });
//     if (!response.ok) {
//         // console.log("Problem deleting store");
//     }
    
// }


// export default function DeleteStoreButton ({storeId}) {
//     const {user} = useUser();
//     const [openModal, setOpenModal] = useState(false);
//     if (user) {
//         return (
//             <div className='className="bg-gray-200 border p-4 w-64"'>
//                 <button className="border-b-2 text-lg font-bold " onClick={() => setOpenModal(true)}>
//                     Delete Store
//                 </button>
//                 <Modal show={openModal} onClose={() => setOpenModal(false)}>
                
//                 <Modal.Header>Delete Store</Modal.Header>
                
//                 <Modal.Body>
//                     <p>Are you sure you want to delete this store?</p>
//                 </Modal.Body>
                
//                 <Modal.Footer>
                  
//                   <Button onClick={async () => {
//                     await deleteStore({storeId})
//                     setOpenModal(false);
//                     window.location.reload()
//                   }}>Yes</Button>
                  
//                   <Button onClick={() => {setOpenModal(false)}}>No</Button>

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

async function deleteStore({ storeId }) {
    const response = await fetch('/api/deleteStore', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ store_id: storeId })
    });
    if (!response.ok) {
        // console.log("Problem deleting store");
    }
}

export default function DeleteStoreButton({ storeId }) {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    if (user) {
        return (
            <div className='bg-gray-200 border p-4 w-64'>
                <button className="border-b-2 text-lg font-bold " onClick={() => setOpenModal(true)}>
                    Delete Store
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this store?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={async () => {
                                setLoading(true);
                                await deleteStore({ storeId });
                                setOpenModal(false);
                                setLoading(false);
                                window.location.reload();
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Yes'}
                        </Button>
                        <Button onClick={() => setOpenModal(false)} disabled={loading}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    } else {
        return <div></div>;
    }
}
