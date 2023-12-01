import Link from 'next/link'


export default function Loggedin() {
    return (
        <main>
            <h2>Click the button!</h2>
            <Link href="/profile">Go To Profile</Link>
        </main>
    )
}