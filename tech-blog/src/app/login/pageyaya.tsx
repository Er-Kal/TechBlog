import { login } from '@/actions/login'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <main>
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required/>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required/>
                <button formAction={login}> Log in </button>
            </form>
            <p>Dont have an account? Sign up below</p>
            <Link href='/signup'>
                <button>Sign Up</button>
            </Link>
        </main>
    )
}