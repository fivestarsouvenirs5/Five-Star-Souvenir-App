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
        const newSizeDetails = await request.formData();

        // console.log(newProductDetails);
        // Sanitize input data
        const newPrice = newSizeDetails.get("price");
        const newSize = newSizeDetails.get("size");
        const newCell = newSizeDetails.get("cell");
        const oldSizeID = parseInt(newSizeDetails.get("oldSizeID"));
        // const oldProductSizeID = parseInt(newSizeDetails.get("oldProductSizeID"));
        // const oldSizeCatgID = parseInt(newSizeDetails.get("oldSizeCatgID"));
        

        const size = await prisma.clothing_product_size.update({
            where: {size_id: oldSizeID},
            data: {
                price: parseInt(newPrice),
                size: newSize,
                clothing_order_form_cell: newCell,
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
