'use client'

import { login } from './actions'
import { useActionState } from 'react'
import Link from 'next/link'    
import styles from './login.module.css'

type LoginState = {
  error: string | null
}

export default function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(login,{ error: null })

  return (
    <div className={styles.formDiv}>
      <form action={formAction} className={styles.form}>
        <label htmlFor="email">Email:</label>
        <input className={styles.formInput} id="email" name="email" type="email" required />

        <label htmlFor="password">Password:</label>
        <input className={styles.formInput} id="password" name="password" type="password" required />

        <button type="submit">Log in</button>
        {state.error && <p>{state.error}</p>}

      </form>
      <p>Don&apos;t have an account yet?</p>  
      <Link href="/signup"> <button type="button">Sign Up</button></Link>
    </div>
    
  )
}
