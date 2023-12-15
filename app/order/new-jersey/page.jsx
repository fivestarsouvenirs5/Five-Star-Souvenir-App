import prisma from '../../utils/prisma'
import CategoryNJ from '../../components/categorynj'
import Cart from '../../components/cart'

const fetchCategories = async () => {
    let categories = await prisma.category.findMany({
        where: {category_location: 0}
    })
    return categories
}
export default async function OrderNJ() {
    const categories = await fetchCategories()

    // console.log({categories})
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
        <div className = "px-20 py-10 flex justify-between gap-20">
            <div className="grid w-5/6 grid-cols-2 gap-20">
                {categories.map((category) => (
                    <div className="border p-5 h-2/6 w-5/6 flex items-center justify-center rounded-md text-center text-2xl font-bold bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                        <CategoryNJ category = {category} />
                    </div>
                ))}
            </div>

            <Cart />
        </div>

    </main>
)
}