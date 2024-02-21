import { promises as fs } from 'fs';
export async function POST(request) {
    try {
      const newSubCatgDetails = await request.json()
    //   console.log(newSubCatgDetails)
      const subcatg = await prisma.subcategories.create({
        data: {
          subcategory_name: newSubCatgDetails.name,
          catg_id: newSubCatgDetails.mainCatgID,
        },
      })

      const newFolderPath = `public/images/CATEGORIES/${newSubCatgDetails.mainCatgName}/${newSubCatgDetails.name}`;
      await fs.mkdir(newFolderPath);

      return new Response();
    }
    catch (error) {
      console.log("adding subcategory error", error)
    }
     
        
  }
  