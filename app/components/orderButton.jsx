'use client'
import { useState } from 'react';
import { useShoppingCart, DebugCart, formatCurrencyString } from 'use-shopping-cart';
import { Button, Modal } from 'flowbite-react';

export default function OrderButton() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const cart = useShoppingCart()
  const { cartDetails, clearCart } = cart  
  const handleOrderButtonClick = async () => {

    try {
      setLoading(true);
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cartDetails})
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
      <button onClick={handleOrderButtonClick} className="text-black" disabled={loading}>
        {loading ? 'Processing...' : 'Order'}
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Order Complete</Modal.Header>
        <Modal.Body>
            <h2> Thank you for placing an order! <Your></Your> order has been sent to Five Star Souvenirs for processing. Any questions or concerns please contact Five Star Souvenirs.</h2>
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