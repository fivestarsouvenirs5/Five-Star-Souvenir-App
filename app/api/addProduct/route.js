// import { promises as fs } from 'fs';
// export async function POST(request) {
//     try {
//       const newProductDetails = await request.json()
//       console.log(newProductDetails)
//       const product = await prisma.products.create({
//         data: {
//           product_name: newProductDetails.name,
//           category_id: newProductDetails.productCatgID,
//           price: newProductDetails.price,
//           in_stock: newProductDetails.stock,
//           subcategory_id: newProductDetails.productSubCatg.subcategory_id,
//           order_form_cell: newProductDetails.cell
//         },
//       })

//     //   const newFolderPath = `public/images/CATEGORIES/${newSubCatgDetails.mainCatgName}/${newSubCatgDetails.name}`;
//     //   await fs.mkdir(newFolderPath);

//       return new Response();
//     }
//     catch (error) {
//       console.log("adding subcategory error", error)
//     }
     
//   }
  


import { promises as fs } from 'fs';
import path from 'path';
import prisma from '../../utils/prisma'

export async function POST(request) {
    try {
        const newProductDetails = await request.json();
        // console.log(newProductDetails);

        // Extract file data from the request body
        const fileData = newProductDetails.file;

        // Save the file to the public/images/CATEGORIES folder
        var newFilePath;
        if (newProductDetails.productSubCatgName !== null){
             newFilePath = path.join('/images/CATEGORIES/', `${newProductDetails.productCatgName}`, '/', `${newProductDetails.productSubCatgName}`, '/', `${newProductDetails.name}.jpg`);
        }
        else {
             newFilePath = path.join('/images/CATEGORIES/', `${newProductDetails.productCatgName}`, '/', `${newProductDetails.name}.jpg`);
        }
        
        await fs.writeFile(newFilePath, Buffer.from(fileData, 'base64'));

        // Create the new product in the database
        const product = await prisma.products.create({
            data: {
                product_name: newProductDetails.name,
                category_id: newProductDetails.productCatgID,
                price: newProductDetails.price,
                in_stock: newProductDetails.stock,
                subcategory_id: newProductDetails.productSubCatgID,
                order_form_cell: newProductDetails.cell,
            },
        });

        return new Response();
    } catch (error) {
        console.error("Error adding product:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
