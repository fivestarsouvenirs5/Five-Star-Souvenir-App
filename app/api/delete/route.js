import fs from 'fs';
import prisma from '../../utils/prisma'
import { del } from '@vercel/blob';

async function fetchParentCategory(id) {
    let category = await prisma.category.findUnique({
        where: {category_id: id}
    })
    return category
}

async function fetchSizes(id) {
    let sizes = await prisma.clothing_product_size.findMany({
        where: { clothing_product_id: id}
    })
    return sizes;
}

export async function DELETE(request) {
    try {
      const itemDetails = await request.json()
      
        if (itemDetails.itemType === "Product") {
            if (itemDetails.myItem.image_id) {
                del(itemDetails.myItem.image_id)
            }
            var sizes = await fetchSizes(itemDetails.myItem.product_id)

            if (itemDetails.myItem.clothing_size_id === 1) {
              sizes.map(async (size) => {
                const deleteSize = await prisma.clothing_product_size.delete ({
                    where: {
                        size_id: size.size_id
                    }
                });
              })
                
            }
            const deleteProduct = await prisma.products.delete({
                where: {
                product_id: itemDetails.myItem.product_id,
                },
            })
            const category = await fetchParentCategory(itemDetails.myItem.category_id)
            //const filePath = `public/images/CATEGORIES/${category.category}/${itemDetails.myItem.product_name}.jpg`;

            // // Delete the file
            // fs.unlink(filePath, (err) => {
            //     if (err) {
            //         console.error('Error deleting file:', err);
            //         return;
            //     }
            //     console.log('File deleted successfully');
            // });
        }
        else if (itemDetails.itemType === "Category") {
            try {
                const deleteCategory = await prisma.category.delete({
                    where: {
                    category_id: itemDetails.myItem.category_id,
                    },
                })
            } catch (err) {
                throw new Error("There was an error deleting this category, please make sure all the subcategories and products inside of it don't exist.")
            }
            // const folderPath = `public/images/CATEGORIES/${itemDetails.myItem.category}`;

            // // Delete the folder
            // fs.rmdir(folderPath, { recursive: true }, (err) => {
            //     if (err) {
            //         console.error('Error deleting folder:', err);
            //         return;
            //     }
            //     console.log('Folder deleted successfully');
            // });
        }
        else if (itemDetails.itemType === "Subcategory") {
            try {
                const deleteSubCatg = await prisma.subcategories.delete({
                    where: {
                    subcategory_id: itemDetails.myItem.subcategory_id,
                    },
                })
            } catch (err) {
                throw new Error("There was an error deleting this subcategory, please make sure all the products inside of it don't exist." + err)
            }
            const category = await fetchParentCategory(itemDetails.myItem.catg_id)
            // const folderPath = `public/images/CATEGORIES/${category.category}/${itemDetails.myItem.subcategory_name}`;

            // // Delete the folder
            // fs.rmdir(folderPath, (err) => {
            //     if (err) {
            //         console.error('Error deleting folder:', err);
            //         return;
            //     }
            //     console.log('Folder deleted successfully');
            // });
        }
      
        return new Response(JSON.stringify({ message: "Success" }), {
            headers: { "Content-Type": "application/json" },
        });
    }
    catch (error) {
    //   console.log("deleting error", error.message)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });
    }
     
        
  }
  