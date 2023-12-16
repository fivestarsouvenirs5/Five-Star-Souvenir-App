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
        <h1 className="text-center py-5 lg:text-4xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(200,0,0,0.8]">Categories: New York</h1>

        <div className="flex justify-between">
            <div className="grid grid-cols-1 gap-5 h-4/6">
                <div className="flex flex-wrap border-black justify-items-start gap-2 w-3/4">
                    <a href="/order/new-york" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-300 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New York</a>
                    <a href="/order/new-jersey" className="rounded-md items-center justify-center text-center text-3xl font-bold bg-red-100 hover:bg-blue-300 border border-black w-full py-10 h-3/6 px-3 text-gray-700 hover:text-gray-900">New Jersey</a>
                </div>
            </div>

            
            
            <div className = "flex justify-between gap-10">

                <div className="grid grid-cols-6 gap-5">
                    {categories.map((category) => (
                        <div className="border rounded-md flex items-center justify-center text-center text-xl bg-blue-100 hover:bg-blue-300" key={category.category_id} >                        
                            <CategoryNY category = {category} />
                        </div>
                    ))}
                </div>
                {/* <div class="border-8 border-sky-500 float-right h-96"></div> */}
                <Cart />

            </div>
        </div>

        

    </main>
)
}