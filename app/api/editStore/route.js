import prisma from '../../utils/prisma';

export async function POST(request) {
    try {
        const updatedStoreDetails = await request.json();

        const storeID = parseInt(updatedStoreDetails.store_id);

        const updatedStore = await prisma.stores.update({
            where: { store_id: storeID },
            data: updatedStoreDetails,
        });
        return new Response(JSON.stringify(updatedStore), { status: 200 });
    } catch (error) {
        console.error("Error updating store:", error);
        return new Response(JSON.stringify({ error: "Failed to update store" }), { status: 500 });
    }
}