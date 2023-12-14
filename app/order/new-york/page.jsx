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
        <h2>Categories</h2>
        <div className = "px-20 py-10 justify-center">
            <div className="grid grid-cols-3 gap-5">
                {categories.map((category) => (
                    <div className="border p-5 rounded-md text-center bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                        <CategoryNY category = {category} />
                    </div>
                ))}
            </div>
        </div>
        

    </main>
)
}