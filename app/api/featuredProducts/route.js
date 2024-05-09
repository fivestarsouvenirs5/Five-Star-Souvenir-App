import fs from 'fs';
import prisma from '../../utils/prisma'
import { del } from '@vercel/blob';

async function fetchFeaturedProducts(id) {
    let featuredProducts = await prisma.products.findMany({
        where: { featured_product: id}
    })
    return featuredProducts;
}

export async function FEATUREDPRODUCTS(request) {
    try {
        var featuredProductList = await fetchFeaturedProducts(1);
        console.log(featuredProductList);
        return new Response(JSON.stringify(featuredProductList), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
    }
    catch (error) {
        //   console.log("deleting error", error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}