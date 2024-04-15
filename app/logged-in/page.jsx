// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css'
import Link from 'next/link'
import prisma from '../utils/prisma'
//import AddProductForm from '../components/addProductForm'

const fetchProducts = async () => {
    let products = await prisma.products.findMany()
    return products
}

//import useSWR from 'swr'
//import { useState } from 'react';

// const fetcher = url => fetch(url).then(res => res.json())
export default async function Loggedin() {
    const products = await fetchProducts()

    // console.log({products})
//     const { data, error } = useSWR('/api/products', fetcher)
//   if (error) return <div>error {error}</div>
//   if (!data) return <div>Loading ...</div>
  return (
    <main>
        <h2 class="text-red-600">Click the button!</h2>
        <h1 class="text-orange-600">Product Data</h1>
        <ul>
            {products.map((product) => (
                <li key={product.product_id}>
                {product.product_name} 
                </li>
            ))}
        </ul> 
        <Link href="/add-product" legacyBehavior> add product
          {/* <a data-active={isActive('/add-product')}>add product</a> */}
        </Link>

        <Link href="/profile">Go To Profile</Link>
    </main>
)
}





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

   
