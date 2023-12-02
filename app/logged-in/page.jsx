 'use client'

import Link from 'next/link'
import { useState } from 'react';


 export default function Loggedin() {
//     const { data, error } = useSWR('/api/products', fetcher)
//   if (error) return <div>An error occured.</div>
//   if (!data) return <div>Loading ...</div>
    const [products, setProducts] = useState([]);

   // useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/products', {cache : 'no-store'}); 
            const data = await response.json();
            console.log('Fetched Data:', data); 
            setProducts(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
     // }, []);

    return (
        <main>
            <h2>Click the button!</h2>
            <h1>User Data</h1>
            <ul>
            {products.map((product) => (
                <li key={product.product_id}>
                {product.product_name} 
                </li>
            ))}
            </ul>
            <Link href="/profile">Go To Profile</Link>
        </main>
    )
}