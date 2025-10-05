'use client'

import {login} from './actions'
import { useActionState } from 'react'
import Link from 'next/link'


export default function LoginForm(){
  const [state, formAction] = useActionState(login, {error:null})

  return (
    <form action={formAction}>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button type="submit">Log in</button>
        {state.error && <p>{state.error}</p>}
        <p>Dont have an account yet?</p>  
        <Link href="/signup"> <button>Sign Up</button></Link>
    </form>
  )
}