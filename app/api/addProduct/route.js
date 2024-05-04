
// import { put } from '@vercel/blob';
// import prisma from '../../utils/prisma'
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//     try {
//         const newProductDetails = await request.formData();
//         // console.log(newProductDetails);

//         // Extract file data from the request body
//         const fileData = newProductDetails.get("file");


//         var blob;
//         if (newProductDetails.productSubCatgID === "null") {
//             blob = await put(`${newProductDetails.get("productCatgName")}_${newProductDetails.get("name")}.jpg`, fileData, {
//                 access: 'public',
//                 // contentType: 'image/jpeg',
//               });
//         }
//         else {
//             blob = await put(`${newProductDetails.get("productCatgName")}_${newProductDetails.get("productSubCatgName")}_${newProductDetails.get("name")}.jpg`, fileData, {
//                 access: 'public',
//                 // contentType: 'image/jpeg',
//               });
//         }
//         // console.log(blob);

//         const product = await prisma.products.create({
//             data: {
//                 product_name: newProductDetails.get("name"),
//                 category_id: parseInt(newProductDetails.get("productCatgID")),
//                 price: parseFloat(newProductDetails.get("price")),
//                 in_stock: newProductDetails.get("stock"),
//                 subcategory_id: parseInt(newProductDetails.get("productSubCatgID")),
//                 order_form_cell: newProductDetails.get("cell"),
//                 image_id: blob.url
//             },
//         });
      

//           return NextResponse.json(blob);
//     } catch (error) {
//         console.error("Error adding product:", error);
//         return new Response("Internal Server Error", { status: 500 });
//     }
// }


import { put } from '@vercel/blob';
import prisma from '../../utils/prisma';
import { escape } from 'he';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const newProductDetails = await request.formData();

        // Sanitize input data
        const sanitizedName = escape(newProductDetails.get("name"));
        const sanitizedCatgName = escape(newProductDetails.get("productCatgName"));
        const sanitizedSubCatgName = escape(newProductDetails.get("productSubCatgName"));
        const sanitizedStock = escape(newProductDetails.get("stock"))

        // Extract file data from the request body
        const fileData = newProductDetails.get("file");

        let blob;
        if (newProductDetails.productSubCatgID === "null") {
            blob = await put(`${sanitizedCatgName}_${sanitizedName}.jpg`, fileData, {
                access: 'public',
            });
        } else {
            blob = await put(`${sanitizedCatgName}_${sanitizedSubCatgName}_${sanitizedName}.jpg`, fileData, {
                access: 'public',
            });
        }

        // Create the product in the database
        const product = await prisma.products.create({
            data: {
                product_name: sanitizedName,
                category_id: parseInt(newProductDetails.get("productCatgID")),
                price: parseFloat(newProductDetails.get("price")),
                in_stock: sanitizedStock,
                subcategory_id: parseInt(newProductDetails.get("productSubCatgID")),
                order_form_cell: newProductDetails.get("cell"),
                clothing_size_id: parseInt(newProductDetails.get("clothingSize")),
                image_id: blob.url
            },
        });


        return new Response(JSON.stringify({ product_id: product.product_id }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error adding product:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
