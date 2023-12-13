import Link from 'next/link'

export default function NavBar() {
    return (
    <nav>
        <h1> Five Star Souvenirs</h1>
        
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
        
        {/* <img className="h-auto max-w-full" src="/app/imgs/Logo.png" alt="image"> */}
        {/* <img className="w-[204px] h-[84px]" src="logo1/Logo.png" /> */}
        
        {/* Nav bar */}

        <nav className="bg-gray-100">
            {/* to indent: max-w-5xl */}
            <div className="px-8 mx-auto border border-red-400">

                <div class="flex justify-between">

                    <div class="flex space-x-4">

                        {/* logo */}
                        <div class="mr-4">
                            <a href="#" class="flex items-center py-3 px-2 text-gray-700">
                                <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <span>Five Star Souvenirs</span>
                            </a>
                        </div>

                        {/* Primary Nav */}
                        <div class="flex items-center space-x-3">
                            <a href="/order/new-york" class="">Order</a>
                            <a href="/contact" class="">Contact</a>
                            <a href="/about-us" class="">About Us</a>
                        </div>

                    </div>

                    <div>secondary nav</div>

                </div>

            </div>
        </nav>
        
        
        {/* <div className="w-[1195px] h-[49px] relative">
        <div className="w-[1195px] h-[49px] left-0 top-0 absolute">
            <div className="w-[1195px] h-[49px] left-0 top-0 absolute bg-red-400" />
            <div className="w-[100px] h-9 left-[74px] top-[6px] absolute text-black text-[32px] font-normal font-['Inter']">
            <Link href="/">home</Link>
            </div>
        </div>
        <div className="w-[139px] h-9 left-[1002px] top-[6px] absolute text-black text-[32px] font-normal font-['Inter']">
            <Link href="/about-us">about us</Link>
            </div>
        <div className="w-[139px] h-9 left-[370px] top-[6px] absolute text-black text-[32px] font-normal font-['Inter']">
            <Link href="/order">order</Link>
        </div>
        <div className="w-[139px] h-9 left-[686px] top-[6px] absolute text-black text-[32px] font-normal font-['Inter']">
            <Link href="/contact">contact</Link><br/>
        </div>
        </div> */}
        
    </nav>
    )
   
}