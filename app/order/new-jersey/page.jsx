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
        {/* <h2 className="text-red-600">Categories</h2>
            {categories.map((category) => (
                <div key={category.category_id} >
                    <CategoryNJ category = {category} />
                </div>
            ))}
        <div>
            
        </div> */}

    <h2>Categories NJ</h2>
    <a href="/order/new-york">Go back</a>
        <div className = "px-20 py-10 justify-center">
            <div className="grid grid-cols-3 gap-5">
                {categories.map((category) => (
                    <div className="border p-5 rounded-md text-center bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                        <CategoryNJ category = {category} />
                    </div>
                ))}
            </div>
        </div>

    </main>
)
}