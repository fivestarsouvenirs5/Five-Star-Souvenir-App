import { promises as fs } from 'fs';
import { escape } from 'he';
import prisma from '../../utils/prisma';

export async function POST(request) {
    try {
        const newSubCatgDetails = await request.json();

        // Sanitize input data
        const sanitizedName = escape(newSubCatgDetails.name);

        // Create the subcategory in the database
        const subcatg = await prisma.subcategories.create({
            data: {
                subcategory_name: sanitizedName,
                catg_id: newSubCatgDetails.mainCatgID,
            },
        });

        // const newFolderPath = `public/images/CATEGORIES/${newSubCatgDetails.mainCatgName}/${sanitizedName}`;
        // await fs.mkdir(newFolderPath);

        return new Response(); // Assuming you want to return an empty response
    } catch (error) {
        // Handle error if necessary
        // console.log("Adding subcategory error", error);
    }
}
