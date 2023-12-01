const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export default async function main() {
    try {
        const allProducts = await prisma.products.findMany();
    console.log(allProducts);
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

