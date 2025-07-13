// 'use client'
// import { Button } from 'flowbite-react';
// import {useState} from 'react';
// export default function EditDeliveryButton({ month, year, number }) {
//     const [loading, setLoading] = useState(false);

    
//     async function editDelivery() {
//         var newMonth = document.getElementById('newMonth').value;
//         var newNumber = document.getElementById('newNumber').value;
//         var newYear = document.getElementById('newYear').value;

//         if (newMonth === "") {
//             newMonth = month;
//         }
//         if (newNumber === "") {
//              newNumber = number;
//         }
//         if (newYear === "") {
//             newYear = year;
//         }

//         var formData = new FormData();
//         formData.append("month", newMonth);
//         formData.append("number", newNumber);
//         formData.append("year", newYear);

//         const response = await fetch('/api/editdelivery', {
//             method: 'POST',
//             body: formData,
//         });
//         if (!response.ok) {
//             console.log("Problem editing delivery date");
//         }
//         var responseData = await response.json();
      

//     }
//     return (
//         <div className="flex items-center space-x-4">
//         <label htmlFor="next-delivery" className="text-lg font-bold">
//           Next Delivery:
//         </label>
//         <input
//           type="text"
//           id="newMonth"
//           placeholder={month}
//           className="border rounded px-2 py-1 text-center w-20"
//         />
//         <input
//           type="text"
//           id="newNumber"
//           placeholder={number}
//           className="border rounded px-2 py-1 text-center w-20"
//         />
//         <input
//           type="text"
//           id="newYear"
//           placeholder={year}
//           className="border rounded px-2 py-1 text-center w-20"
//         />
//         <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={async () => {
//             setLoading(true)
//           await editDelivery();
//           setLoading(false);
//         }}
//       >
//         {loading ? "Processing..." : "Update"}
//       </Button>
//       </div>
//     )
// }
'use client'
import { Button } from 'flowbite-react';
import { useState } from 'react';

export default function DeliveryButton({ date }) {
  const [loading, setLoading] = useState(false);
   const [deleteLoading, setDeleteLoading] = useState(false);

  async function editDelivery() {
    const newMonth = document.getElementById(`newMonth-${date.delivery_id}`).value || date.month;
    const newNumber = document.getElementById(`newNumber-${date.delivery_id}`).value || date.number;
    const newYear = document.getElementById(`newYear-${date.delivery_id}`).value || date.year;

    // Validate inputs
    if (newNumber < 1 || newNumber > 31) {
      alert('Day must be between 1 and 31.');
      return;
    }

    if (!/^\d{4}$/.test(newYear)) {
      alert('Year must be a 4-digit number.');
      return;
    }

    const formData = new FormData();
    formData.append('id', date.delivery_id);
    formData.append('month', newMonth);
    formData.append('number', newNumber);
    formData.append('year', newYear);

    const response = await fetch('/api/editdelivery', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      console.log('Problem editing delivery date');
    }
    const responseData = await response.json();
  }


  async function deleteDelivery() {

   const response = await fetch('/api/deletedelivery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: date.delivery_id,
        }),
      });
    const responseData = await response.json();
  }

  return (
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 md:space-x-8">
        
        <div className="flex flex-wrap sm:flex-row sm:space-x-4 w-full sm:w-auto">
          <input
            type="text"
            id={`newMonth-${date.delivery_id}`}
            placeholder={date.month}
            className="border rounded px-2 py-1 text-center w-full sm:w-20 md:w-24 mb-2 sm:mb-0 sm:w-auto"
          />
          <input
            type="number"
            id={`newNumber-${date.delivery_id}`}
            placeholder={date.number}
            min="1"
            max="31"
            className="border rounded px-2 py-1 text-center w-full sm:w-20 md:w-24 mb-2 sm:mb-0 sm:w-auto"
          />
          <input
            type="text"
            id={`newYear-${date.delivery_id}`}
            placeholder={date.year}
            pattern="\d{4}"
            className="border rounded px-2 py-1 text-center w-full sm:w-20 md:w-24 mb-2 sm:mb-0 sm:w-auto"
            title="Year must be a 4-digit number."
          />
        </div>
      <Button
        id="edit-delivery-button"
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs sm:text-sm md:text-base sm:mt-0 mt-2"
        onClick={async () => {
          setLoading(true);
          await editDelivery();
          setLoading(false);
          window.location.reload();
        }}
      >
        {loading ? 'Processing...' : 'Update'}
      </Button>

      <Button
        id="deleteDeliveryButton"
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs sm:text-sm md:text-base sm:mt-0 mt-2"
        onClick={async () => {
          setDeleteLoading(true);
          await deleteDelivery();
          setDeleteLoading(false);
          window.location.reload();
        }}
      >
        {deleteLoading ? 'Processing...' : 'Delete'}
      </Button>
      </div>



  );
}
