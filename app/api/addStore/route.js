import prisma from '../../utils/prisma'

export async function POST(request) {
    try {
        const newStoreDetails = await request.json();
        console.log(newStoreDetails);
        // Create the store in the database
        const res = await prisma.stores.create({
            data: {
                user_id: newStoreDetails.newID,
                store_name: newStoreDetails.newName,
                store_street: newStoreDetails.newStreet,
                store_city: newStoreDetails.newCity,
                store_state: newStoreDetails.newState,
                store_zip: newStoreDetails.newZip,
            },
        });
;

        // Return a success response with a message
        return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
        console.error("Error adding store:", error);
        // Return an error response
        return new Response('Failed to add store', { status: 500 });
    }
}