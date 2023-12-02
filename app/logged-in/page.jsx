 'use client'

import Link from 'next/link'
import useSWR from 'swr'
//import { useState } from 'react';

const fetcher = url => fetch(url).then(res => res.json())
 export default function Loggedin() {
    const { data, error } = useSWR('/api/products', fetcher)
  if (error) return <div>error {error}</div>
  if (!data) return <div>Loading ...</div>
  return (
    // <main>
    //     <h2>Click the button!</h2>
    //     <h1>User Data</h1>
    <ul>
        {data.products.map((product) => (
            <li key={product.product_id}>
            {product.product_name} 
            </li>
        ))}
    </ul> 
    //      <Link href="/profile">Go To Profile</Link>
    //  </main>
)
//     const [products, setProducts] = useState([]);

//    // useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch('/api/products', {cache : 'no-store'}); 
//             const data = await response.json();
//             console.log('Fetched Data:', data); 
//             setProducts(data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchData();
//      // }, []);

   
}