import prisma from '../../utils/prisma'

export async function DELETE(request) {
    try {
        const storeDetails = await request.json();
        // Create the store in the database
        const deleteStore = await prisma.stores.delete({
            where: {
                store_id: storeDetails.store_id,
            },
        });

        // Return a success response with a message
        return new Response(JSON.stringify({ message: "Success" }), {
            headers: { "Content-Type": "application/json" },
        });
    }  catch (error) {
        console.log("deleting error", error.message)
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
      });
    }
}