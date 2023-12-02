const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// export default async function handler(req, res) {
//     try {
//       const products = await prisma.products.findMany(); // Assuming your model is named 'Product'
//       res.json(products);
//     } catch (error) {
//       console.error(error);
//       res.json({ error: 'Internal Server Error' });
//     } finally {
//       await prisma.$disconnect();
//     }
//   }

export default async function main() {
    try {
        const allProducts = await prisma.products.findMany();
    console.log('fetched data frojm products', allProducts);
    }
    catch (error){
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    }
    finally {
        await prisma.$disconnect()
    }
    
}

