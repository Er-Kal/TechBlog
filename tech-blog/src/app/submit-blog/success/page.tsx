'use server'

import { redirect } from "next/navigation"

export default async function SubmitSuccess() {

    const timer = await setTimeout(() => {
        redirect('/success')
    }, 5000);

    timer;

    return (<main>
        <h1> Your submission was a success!</h1>
        <p> You will be redirected in 5 seconds </p>
    </main>)
}