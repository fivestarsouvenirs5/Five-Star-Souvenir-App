'use client'
import { useState } from 'react';
import {useEffect} from 'react'
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import { Button, Modal } from 'flowbite-react';

// function StoreSelector ({storeList}) {
//   const [selectedStore, setSelectedStore] = useState('');
//   const [selectedStoreAddress, setSelectedStoreAddress] = useState('');
  
//   useEffect(() => {
//     const selectedStoreObject = storeList.find(store => store.store_name === selectedStore);
    
//     if (selectedStoreObject) {
//         setSelectedStoreAddress(selectedStoreObject.store_address);
//     }
//     else {
//         setSelectedStoreAddress('');
//     }
//   }, [selectedStore, storeList]);
  
//   const handleStoreChange = (event) => {
//       setSelectedStore(event.target.value);
//   };
  
//   return (
//       <div>
//           <label>Please Select a Store: </label>
//           <select id='storeselector' onChange={handleStoreChange} value={selectedStore}>
//               <option value="" disabled>--</option>
//               {storeList.map((store) => (
//               <option key={store.store_id} value={store.store_name}>{store.store_name}</option>
//               ))}
//           </select>
          
//           {selectedStoreAddress && <p>Address: {selectedStoreAddress}</p>}
//       </div>
//   );
// }

export default function OrderButton({storeList}) {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [preOrderOpenModal, setPreOrderOpenModal] = useState(false);
  const cart = useShoppingCart()
  const { cartDetails, clearCart } = cart  
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedStoreAddress, setSelectedStoreAddress] = useState('');
  
  useEffect(() => {
    const selectedStoreObject = storeList.find(store => store.store_name === selectedStore);
    if (selectedStoreObject) {
        setSelectedStoreAddress(selectedStoreObject.store_address);
    }
    else {
        setSelectedStoreAddress('');
    }
  }, [selectedStore, storeList]);

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };


  const handleOrderButtonClick = async () => {

    try {
      setLoading(true);
      setPreOrderOpenModal(false);
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cart: cartDetails, selectedStore: selectedStore})
      });
      if (!response.ok) {
        throw new Error('Failed to fetch order data');
      }

      clearCart()
      setOpenModal(true);

    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="text-black" disabled={loading} onClick={() => setPreOrderOpenModal(true)}>
        {loading ? 'Processing...' : 'Order'}
      </button>
      <Modal show={preOrderOpenModal} onClose={() => setPreOrderOpenModal(false)}>
      <Modal.Header>Order</Modal.Header>
                <Modal.Body>
                    <h3>Are you sure you want to order?</h3>
                    <div>
                        <label>Please Select a Store: </label>
                        <select id='storeselector' onChange={handleStoreChange} value={selectedStore}>
                            <option value="" disabled>--</option>
                            {storeList.map((store) => (
                            <option key={store.store_id} value={store.store_name}>{store.store_name}</option>
                            ))}
                        </select>
                        
                        {selectedStoreAddress && <p>Address: {selectedStoreAddress}</p>}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleOrderButtonClick}>Yes</Button>
                  <Button onClick={ () => {setPreOrderOpenModal(false)}}>No</Button>
                </Modal.Footer>
      </Modal>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Order Complete</Modal.Header>
        <Modal.Body>
            <h2> Thank you for placing an order! Your order has been sent to Five Star Souvenirs for processing. Any questions or concerns please contact Five Star Souvenirs.</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            setOpenModal(false);
            window.location.assign("/products/new-york")
          }}>Continue Shopping</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}