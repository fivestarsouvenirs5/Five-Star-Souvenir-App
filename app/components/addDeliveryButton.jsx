'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useRef } from 'react';

export default function AddDeliveryButton() {

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const monthRef = useRef();
    const numberRef = useRef();
    const yearRef = useRef();

    async function addDelivery() {
        const month = monthRef.current.value;
        const number = numberRef.current.value;
        const year = yearRef.current.value;

        console.log(month, number, year); // ✅ should now log correctly

        const response = await fetch('/api/addDelivery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ m: month, n: number, y: year }),
        });

        if (!response.ok) {
            console.log('Problem adding delivery');
        }
    }

    return (
        <div >
            <button className="text-sm text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded font-bold" onClick={() => setOpenModal(true)}>
                Add Date
            </button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>New Date</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-wrap sm:flex-row sm:space-x-4 w-full sm:w-auto">
                        <label htmlFor="newMonth" className="text-sm font-semibold mb-2 sm:mb-0">
                            Month:
                        </label>
                        <input
                            type="text"
                            id="newMonth"
                            ref={monthRef}
                            className="border rounded px-2 py-1 text-center w-full sm:w-20"
                        />

                        <label htmlFor="newNumber" className="text-sm font-semibold mb-2 sm:mb-0">
                            Day:
                        </label>
                        <input
                            type="number"
                            id="newNumber"
                            ref={numberRef}
                            min="1"
                            max="31"
                            className="border rounded px-2 py-1 text-center w-full sm:w-20"
                        />

                        <label htmlFor="newYear" className="text-sm font-semibold mb-2 sm:mb-0">
                            Year:
                        </label>
                        <input
                            type="text"
                            id="newYear"
                            ref={yearRef}
                            pattern="\d{4}"
                            className="border rounded px-2 py-1 text-center w-full sm:w-20"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true);
                            await addDelivery();
                            setOpenModal(false);
                            setLoading(false);
                            window.location.reload();
                        }}
                    >
                        {loading ? 'Processing...' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
