import { useState } from 'react';

export default function OrderButton({ cartDetails }) {
  const [loading, setLoading] = useState(false);

  const handleOrderButtonClick = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cartDetails })
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch order data');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link element and click it to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'current_order.xlsx';
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
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
    </div>
  );
}