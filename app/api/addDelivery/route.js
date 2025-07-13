import prisma from '../../utils/prisma'
import { escape } from 'he';

export async function POST(request) {
    try {
        const newDateDetails = await request.json();
        console.log(newDateDetails);

        const newMonth = escape(newDateDetails.m);
        const newNumber = parseInt(newDateDetails.n);
        const newYear = parseInt(newDateDetails.y);

        // Create the category in the database
        const date = await prisma.delivery_date.create({
            data: {
                month: newMonth,
                number: newNumber,
                year: newYear,
            },
        });

        // Create a new folder for the category images
        // const newFolderPath = `public/images/CATEGORIES/${newCatgDetails.name}`;
        // await fs.mkdir(newFolderPath);

        // Return a success response with a message
        return new Response('Date created successfully', { status: 200 });
    } catch (error) {
        console.error("Error adding Date:", error);
        // Return an error response
        return new Response('Failed to add date', { status: 500 });
    }
}

  