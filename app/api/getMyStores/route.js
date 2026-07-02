import prisma from '../../utils/prisma';

export async function POST(request) {
    const myRequest = await request.json();
    const id = myRequest.id;

    try {
        const stores = await prisma.stores.findMany({
            where: { user_id: id },
        });
        
        return new Response(JSON.stringify(stores), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // Handle error
        console.error("Error fetching stores:", error);
        throw error; // Re-throw the error if needed
    }
}