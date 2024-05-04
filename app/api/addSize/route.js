import { put } from '@vercel/blob';
import prisma from '../../utils/prisma';
import { escape } from 'he';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const newSizeDetails = await request.json();
        console.log(newSizeDetails.product_id)

        // Create the product in the database
        const size = await prisma.clothing_product_size.create({
            data: {
                clothing_product_id: parseInt(newSizeDetails.product_id),
                category_id: parseInt(newSizeDetails.catgID),
                size: newSizeDetails.size,
                clothing_order_form_cell: newSizeDetails.cell,
                price: parseInt(newSizeDetails.price)
            },
        });

        return new Response(JSON.stringify(size), {
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
