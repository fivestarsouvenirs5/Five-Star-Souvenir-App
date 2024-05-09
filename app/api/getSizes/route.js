import prisma from '../../utils/prisma';

export async function POST(request) {
    try {
        const req = await request.json();
        let sizes = await prisma.clothing_product_size.findMany({
            where: {clothing_product_id: req.productID }
        })

        return new Response(JSON.stringify(sizes), {
            status: 200,
        });
    } catch (error) {
        console.error("Error editing product:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
