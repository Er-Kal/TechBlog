import {signup} from './actions'
import Link from 'next/link'

export default function SignUpPage() {
    return (
        <main>
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required/>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required/>
                <button formAction={signup}> Sign Up </button>
            </form>
            <p>Already have an account? </p>
            <Link href='/login'>
                <button>Login</button>
            </Link>
        </main>
    )
}