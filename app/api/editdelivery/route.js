
import prisma from '../../utils/prisma';

export async function POST(request) {
    try {
        const newDateDetails = await request.formData();

        const newMonth = newDateDetails.get("month");
        const newNumber = newDateDetails.get("number");
        const newYear = newDateDetails.get("year");
        
        

        const date = await prisma.delivery_date.update({
            where: {delivery_id: parseInt(newDateDetails.get("id"))},
            data: {
                month: newMonth,
                number: parseInt(newNumber),
                year: parseInt(newYear),
            },
        });

        const newDate = await prisma.delivery_date.findUnique({
            where: {delivery_id: 1}
        })

    

        return new Response(JSON.stringify({newDate: newDate}), {
            status: 200,
        });
    } catch (error) {
        console.error("Error editing product:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
