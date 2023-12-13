import prisma from '../../utils/prisma'
import CategoryNJ from '../../components/categorynj'

const fetchCategories = async () => {
    let categories = await prisma.category.findMany({
        where: {category_location: 0}
    })
    return categories
}
export default async function OrderNJ() {
    const categories = await fetchCategories()

    console.log({categories})
  return (
    <main>
        <h2 class="text-red-600">Categories</h2>
            {categories.map((category) => (
                <div key={category.category_id} >
                    <CategoryNJ category = {category} />
                </div>
            ))}
        <div>
            
        </div>

    </main>
)
}