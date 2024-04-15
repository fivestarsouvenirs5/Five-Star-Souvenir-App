
import { put } from '@vercel/blob';
import prisma from '../../utils/prisma'
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const newProductDetails = await request.formData();
        // console.log(newProductDetails);

        // Extract file data from the request body
        const fileData = newProductDetails.get("file");


        var blob;
        if (newProductDetails.productSubCatgID === "null") {
            blob = await put(`${newProductDetails.get("productCatgName")}_${newProductDetails.get("name")}.jpg`, fileData, {
                access: 'public',
                // contentType: 'image/jpeg',
              });
        }
        else {
            blob = await put(`${newProductDetails.get("productCatgName")}_${newProductDetails.get("productSubCatgName")}_${newProductDetails.get("name")}.jpg`, fileData, {
                access: 'public',
                // contentType: 'image/jpeg',
              });
        }
        // console.log(blob);

        const product = await prisma.products.create({
            data: {
                product_name: newProductDetails.get("name"),
                category_id: parseInt(newProductDetails.get("productCatgID")),
                price: parseFloat(newProductDetails.get("price")),
                in_stock: newProductDetails.get("stock"),
                subcategory_id: parseInt(newProductDetails.get("productSubCatgID")),
                order_form_cell: newProductDetails.get("cell"),
                image_id: blob.url
            },
        });
      

          return NextResponse.json(blob);
    } catch (error) {
        console.error("Error adding product:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
