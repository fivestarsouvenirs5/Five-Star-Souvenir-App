import prisma from '../../utils/prisma'
import CategoryNY from '../../components/categoryny'
import Cart from '../../components/cart'

const fetchCategories = async () => {
    let categories = await prisma.category.findMany({
        where: {category_location: 1}
    })
    return categories
}
export default async function OrderNY() {
    const categories = await fetchCategories()

    // console.log({categories})

    return (
    <main>
        <h2>Categories NY</h2>
        <div className = "px-20 py-10 flex justify-between gap-10">
            
            <div className="grid grid-cols-6 gap-5">
                {categories.map((category) => (
                    <div className="border p-5 rounded-md flex items-center justify-center text-center text-xl font-bold bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                        <CategoryNY category = {category} />
                    </div>
                ))}
            </div>

            {/* <div class="border-8 border-sky-500 float-right h-96"></div> */}
            <Cart />

        </div>

    </main>
)
}