import prisma from "../utils/prisma"

// POST /api/products

export default async function handle(req, res) {
  const { product_name } = req.body
  const result = await prisma.products.create({
    data: {
      product_name: product_name
    },
  })
  console.log("created record")
  res.json(result)
}






// const { PrismaClient } = require('@prisma/client')

// const prisma = new PrismaClient()

// export default async function handler(req, res) {
//       const products = await prisma.products.findMany();
//       console.log(res);
      //res.json(products);
//}






// export default async function main() {
//     try {
//         const allProducts = await prisma.products.findUnique({
//             where: { product_id: 1},
//         });
//     console.log('fetched data frojm products', allProducts);
//     }
//     catch (error){
//         console.error(error)
//         process.exit(1)
//     }
    
// }

