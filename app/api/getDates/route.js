 export async function GET(request) {
  
    try {
        const dates = await prisma.delivery_date.findMany({
        });
        
        return new Response(JSON.stringify(dates), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // Handle error
        console.error("Error fetching delivery dates:", error);
        throw error; // Re-throw the error if needed
    }
}