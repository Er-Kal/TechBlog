import {signup} from './actions'
import Link from 'next/link'
import styles from './signup.module.css'

export default function SignUpPage() {
    return (
        <main>
            <div className={styles.formDiv}>
                <form className={styles.form}>
                    <label htmlFor="username">Username</label>
                    <input className={styles.formInput} id="username" name="username" type="username" required/>
                    <label htmlFor="email">Email</label>
                    <input className={styles.formInput} id="email" name="email" type="email" required/>
                    <label htmlFor="password">Password</label>
                    <input className={styles.formInput} id="password" name="password" type="password" required/>
                    <button formAction={signup}> Sign Up </button>
                </form>
                <p>Already have an account? </p>
                <Link href='/login'>
                    <button>Login</button>
                </Link>
            </div>
            
        </main>
    )
}