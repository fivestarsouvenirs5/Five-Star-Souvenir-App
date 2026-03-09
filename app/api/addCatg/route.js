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
import { escape } from 'he';
import { put } from '@vercel/blob';

export async function POST(request) {
    try {
        const newCatgDetails = await request.formData();

        // Extract file data from the request body
        const fileData = newCatgDetails.get("file");

        const sanitizedName = escape(newCatgDetails.get("name"));
        const newLocation = parseInt(newCatgDetails.get("newLocation"));

        let blob = await put(`${sanitizedName}.jpg`, fileData, {
                access: 'public',
            });

        // Create the category in the database
        const catg = await prisma.category.create({
            data: {
                category: sanitizedName,
                category_location: newLocation,
                image_id: blob.url,
            },
        });

        

        // Create a new folder for the category images
        // const newFolderPath = `public/images/CATEGORIES/${newCatgDetails.name}`;
        // await fs.mkdir(newFolderPath);

        // Return a success response with a message
        return new Response(JSON.stringify({ category_id: catg.category_id }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error adding product:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

  