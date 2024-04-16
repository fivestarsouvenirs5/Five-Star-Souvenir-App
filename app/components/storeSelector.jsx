'use client'
import DeleteStoreButton from './deleteStoreButton';
import { decode } from 'he';

export default function StoreSelector({ storeList }) { 
    if (storeList.length === 0) {
        return (
            <div className="flex items-center font-bold">No Stores Added Yet</div>
        )
    }
    
    return (
        <table className="w-full table-auto border-separate border-spacing-5 border border-slate-400 mt-5 mb-5">
            <thead className="border-b-2 border-gray-200">
                <tr>
                    <th>Store Name</th>
                    <th>Store Address</th>
                    <th>🗑️</th>
                </tr>
            </thead>
            <tbody>
                {storeList.map((store, index) => (
                    <tr key={index}>
                        <td>{decode(store.store_name)}</td>
                        <td>{decode(store.store_address)}</td>
                        <td>
                            <DeleteStoreButton storeId={store.store_id}>Delete</DeleteStoreButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
