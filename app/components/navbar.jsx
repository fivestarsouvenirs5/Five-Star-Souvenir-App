import  MainLinks  from './mainLinks';
import AuthenticationButtons from './authenticationButtons'


export default function NavBar() {
    return (
    <nav>
        {/* <img className="h-auto max-w-full" src="/app/imgs/Logo.png" alt="image"> */}
        {/* <img className="w-[204px] h-[84px]" src="logo1/Logo.png" /> */}
        
        {/* Nav bar */}

        <nav className="bg-red-100">
            {/* to indent: max-w-5xl */}
            <div className="px-4 mx-auto">
                <div className="flex justify-between">
                    <div className="flex space-x-4">

                        {/* logo */}
                        {/* <div className="mr-4">
                            <a href="#" className="flex items-center py-5 px-3 text-gray-700">
                                <svg className="h-6 w-6 mr-1 text-red" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <span className="font-bold">Five Star Souvenirs</span>
                            </a>
                        </div> */}

                        {/* Primary Nav */}
                        
                        <MainLinks />
                    </div>

                    <AuthenticationButtons />

                    {/* mobile button here */}
                    {/* <div class="md:hidden flex items-center">
                        mobile thing
                    </div> */}

                </div>

            </div>

            {/* mobile menu */}
            {/* <div class="">
                <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">order</a>
                <a href="#" class="block">ya</a>
            </div> */}
        </nav>
        

        
    </nav>
    )
   
}