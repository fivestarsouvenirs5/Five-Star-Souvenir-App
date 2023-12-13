import prisma from '../../utils/prisma'
import CategoryNY from '../../components/categoryny'

const fetchCategories = async () => {
    let categories = await prisma.category.findMany({
        where: {category_location: 1}
    })
    return categories
}
export default async function OrderNY() {
    const categories = await fetchCategories()

    console.log({categories})
  return (
    <main>
        <h2 class="text-red-600">Categories</h2>
            {categories.map((category) => (
                <div key={category.category_id} >
                    <CategoryNY category = {category} />
                </div>
            ))}
        <div>
            
        </div>
        

    </main>
)
}