import Link from 'next/link'

export default function NavBar() {
    return (
    <nav>
        <h1> Five Star Souvenirs</h1>
        
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
        
        {/* <img className="h-auto max-w-full" src="/app/imgs/Logo.png" alt="image"> */}
        
        {/* Nav bar */}
        <div className="w-[1195px] h-[49px] relative">
        <div className="w-[1195px] h-[49px] left-0 top-0 absolute">
            <div className="w-[1195px] h-[49px] left-0 top-0 absolute bg-red-400" />
            <div className="w-[100px] h-9 left-[74px] top-[6px] absolute text-black text-[32px] font-normal font-['Inter']">
            <Link href="/">Home</Link>
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
        </div>
        
    </nav>
    )
   
}