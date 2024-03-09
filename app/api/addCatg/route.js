// import { promises as fs } from 'fs';
// export async function POST(request) {
//     try {
//       const newCatgDetails = await request.json()
//     //   console.log(newCatgDetails)
//       const catg = await prisma.category.create({
//         data: {
//           category: newCatgDetails.name,
//           category_location: newCatgDetails.newLocation,
//         },
//       })

//       const newFolderPath = `public/images/CATEGORIES/${newCatgDetails.name}`;
//       await fs.mkdir(newFolderPath);

//       return new Response();
//     }
//     catch (error) {
//       console.log("adding category error", error)
//     }
     
        
//   }
import { promises as fs } from 'fs';
import prisma from '../../utils/prisma'

export async function POST(request) {
    try {
        const newCatgDetails = await request.json();
        // Create the category in the database
        const catg = await prisma.category.create({
            data: {
                category: newCatgDetails.name,
                category_location: newCatgDetails.newLocation,
            },
        });

        // Create a new folder for the category images
        const newFolderPath = `/images/CATEGORIES/${newCatgDetails.name}`;
        await fs.mkdir(newFolderPath);

        // Return a success response with a message
        return new Response('Category created successfully', { status: 200 });
    } catch (error) {
        console.error("Error adding category:", error);
        // Return an error response
        return new Response('Failed to add category', { status: 500 });
    }
}

  