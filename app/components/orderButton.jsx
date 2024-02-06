//csv stuff
// import { useState } from 'react';

// export default function OrderButton({ cartDetails }) {
//   const [orderData, setOrderData] = useState(null);

//   const handleOrderButtonClick = async () => {
//     try {
//       const response = await fetch('/api/order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: cartDetails,
//       })

//       if (!response.ok) {
//         throw new Error('Failed to fetch order data');
//       }
//       const csvData = await response.text();
//       console.log(csvData)

//       const parsedData = [];
//       csvData.trim().split('\n').forEach(row => {
//         const rowData = row.split(',');
//         parsedData.push(rowData);
//       });
      
//       setOrderData(parsedData);
//       handleDownloadClick();
//     } catch (error) {
//       console.error('Error fetching order data:', error);
//     }
//   };

//   const handleDownloadClick = () => {
//     if (orderData) {
//       // Convert orderData back to CSV format
//       const csvContent = orderData.map(row => row.join(',')).join('\n');
//       const blob = new Blob([csvContent], { type: 'text/csv' });
//       const url = window.URL.createObjectURL(blob);

//       // Create a link element and click it to trigger the download
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'order.csv';
//       document.body.appendChild(link);
//       link.click();

//       // Clean up
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleOrderButtonClick} className="text-black">
//         Order
//       </button>
//     </div>
//   );
// }

//xslx stuff
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

      if (!response.ok) {
        throw new Error('Failed to fetch order data');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link element and click it to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'modified_order.xlsx';
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