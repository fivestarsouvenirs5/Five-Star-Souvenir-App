'use client'
import { useState } from 'react';
import {useEffect} from 'react'
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import { Button, Modal } from 'flowbite-react';
import { useMyUser } from "../context/userContext";

export default function OrderButton({page}) {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [preOrderOpenModal, setPreOrderOpenModal] = useState(false);
  const cart = useShoppingCart()
  const { cartDetails, clearCart } = cart  
  const { selectedStore, myStores} = useMyUser();
  const [editMode, setEditMode] = useState(false);

  const [selectedCartStore, setSelectedCartStore] = useState(null);
  const [loadingStore, setLoadingStore] = useState(true);

  const isCartEmpty = !cartDetails || Object.keys(cartDetails).length === 0;

  useEffect(() => {
    if (selectedStore) {
      setSelectedCartStore(selectedStore);
      setLoadingStore(false);
    }
  }, [selectedStore]);


  

  const handleStoreChange = (event) => {
    const selectedStoreObject = myStores.find(store => store.store_name === event.target.value);
    setSelectedCartStore(selectedStoreObject);
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
        body: JSON.stringify({cart: cartDetails, selectedStore: selectedCartStore})
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
      <button className=" text-xl text-neutral-blue-light bg-secondary hover:bg-secondary-dark rounded-md py-2 px-4 w-72 disabled:opacity-50" disabled={loading || isCartEmpty} onClick={() => setPreOrderOpenModal(true)}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>
      {isCartEmpty && (
        <p className="text-sm text-muted-foreground mt-2">
          Add items to your cart to place an order.
        </p>
      )}
      <Modal show={preOrderOpenModal} onClose={() => setPreOrderOpenModal(false)}>
      <Modal.Header>Order</Modal.Header>
                <Modal.Body>
                 {
                    loadingStore ? (
                      <div className="py-6 flex justify-center items-center">
                        <p className="text-muted-foreground">
                          Loading store...
                        </p>
                      </div>
                    ) : !editMode ? (
                      <div>
                        <h3>Are you sure you want to order from:</h3>

                        <br />

                        <p>{selectedCartStore?.store_name}</p>
                        <p>{selectedCartStore?.store_street}</p>

                        <p>
                          {selectedCartStore?.store_city},{" "}
                          {selectedCartStore?.store_state}{" "}
                          {selectedCartStore?.store_zip}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <label>Please Select a Store: </label>

                        <select
                          id="storeselector"
                          onChange={handleStoreChange}
                          value={selectedCartStore?.store_name || ""}
                        >
                          {myStores.map((store) => (
                            <option
                              key={store.store_id}
                              value={store.store_name}
                            >
                              {store.store_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  }
                                      
                    

                </Modal.Body>
                <Modal.Footer>
                  {!editMode ? <Button onClick={handleOrderButtonClick}>Confirm Order</Button> :
                  <Button onClick={() => setEditMode(false)} disabled={!selectedStore}>Select Store</Button>}
                  {!page && ( !editMode? <Button onClick={() => setEditMode(true)}>Change Store</Button> :
                  <Button onClick={() => setEditMode(false)}>Cancel</Button>) 
                  }
                 
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
            if (closeCart) {
              closeCart(false);
            }
          }}>Continue Shopping</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}