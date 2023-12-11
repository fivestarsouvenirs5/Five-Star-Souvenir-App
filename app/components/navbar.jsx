import Link from 'next/link'

export default function NavBar() {
    return (
    <nav>
        <h1> Five Star Souvenirs</h1>
        <Link href="/">Home</Link>
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
        
    </nav>
    )
   
}