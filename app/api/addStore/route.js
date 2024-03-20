import prisma from '../../utils/prisma'

export async function POST(request) {
    try {
        const newStoreDetails = await request.json();
        // Create the store in the database
        const store = await prisma.stores.create({
            data: {
                user_id: newStoreDetails.newId,
                store_name: newStoreDetails.newName,
                store_address: newStoreDetails.newAddress,
            },
        });

        // Return a success response with a message
        return new Response('Store added successfully', { status: 200 });
    } catch (error) {
        console.error("Error adding store:", error);
        // Return an error response
        return new Response('Failed to add store', { status: 500 });
    }
}