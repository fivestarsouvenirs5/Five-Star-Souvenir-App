import prisma from '../../utils/prisma';
export async function GET() {
    try {
        const featuredProducts = await prisma.products.findMany({
            where: {
                featured_product: 1,
            },
            include: {
                category: true,
                subcategories: true,
            },
        });

        return new Response(JSON.stringify(featuredProducts), {
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        console.error("Error fetching featured products:", error);

        return new Response(
            JSON.stringify({
                error: "Failed to fetch featured products",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}