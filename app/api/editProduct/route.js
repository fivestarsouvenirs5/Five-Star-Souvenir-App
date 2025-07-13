import { put } from '@vercel/blob';
import prisma from '../../utils/prisma';
import { escape } from 'he';
import { NextResponse } from 'next/server';

const fetchCategory = async (id) => {
    let category = await prisma.category.findUnique({
         where: {category_id: id}
     })
     return category
   }
   
   const fetchSubCatg = async (id) => {
    let category = await prisma.subcategories.findUnique({
         where: {subcategory_id: id}
     })
     return category
   }

export async function POST(request) {
    try {
        const newProductDetails = await request.formData();

        // console.log(newProductDetails);
        // Sanitize input data
        const sanitizedName = escape(newProductDetails.get("name"));
        const sanitizedStock = escape(newProductDetails.get("stock"));
        const oldProductCatgID = parseInt(newProductDetails.get("oldProductCatgID"));
        const oldProductID = parseInt(newProductDetails.get("oldProductID"));
        const catg = await fetchCategory(oldProductCatgID)
        const oldImage = newProductDetails.get("image")
        const featured = parseInt(newProductDetails.get("featured"))
        var qty = null;
        if (newProductDetails.get("qty") !== null && newProductDetails.get("qty") !== "") {
            qty = parseInt(newProductDetails.get("qty"));
        }
       

        // Extract file data from the request body
        const fileData = newProductDetails.get("file");
        const oldProductSubCatgID = newProductDetails.get("oldProductSubCatgID");
        var image;
        if (fileData !== 'null') {
            let blob;
            if (oldProductSubCatgID === 'null') {
                blob = await put(`${catg.category}_${sanitizedName}.jpg`, fileData, {
                    access: 'public',
                });
            } else {
                const subcatg = await fetchSubCatg(parseInt(oldProductSubCatgID));
                blob = await put(`${catg.category}_${subcatg.subcategory_name}_${sanitizedName}.jpg`, fileData, {
                    access: 'public',
                });
            }
            image = blob.url;
        }
        else {
            if (oldImage === "null") {
                image = null;
            }
            else {
                image = oldImage;
            }
        }
        

        // Create the product in the database
        const product = await prisma.products.update({
            where: {product_id: oldProductID},
            data: {
                product_name: sanitizedName,
                price: parseFloat(newProductDetails.get("price")),
                in_stock: sanitizedStock,
                order_form_cell: newProductDetails.get("cell"),
                featured_product: featured,
                image_id: image,
                set_qty: qty,
            },
        });


        return new Response("success", {
            status: 200,
        });
    } catch (error) {
        console.error("Error editing product:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
