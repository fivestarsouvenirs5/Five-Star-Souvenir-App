'use client'
import React, { useState, useEffect } from 'react';

export default function StoreSelector({ storeList }) {
    
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
    
    return (
        <div>
            <label>Please Select a Store: </label>
            <select id='selector' onChange={handleStoreChange} value={selectedStore}>
                <option value="" disabled>--</option>
                {storeList.map((store) => (
                <option key={store.store_id} value={store.store_name}>{store.store_name}</option>
                ))}
            </select>
            
            {selectedStoreAddress && <p>Address: {selectedStoreAddress}</p>}
        </div>
    );
}
