'use server'

import SignupForm from './SignupForm'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function SignUpPage() {
    const supabase = createClient();
    
    const {data: {session}} = await (await supabase).auth.getSession();

    if (session){
        redirect('/')
    }
    
    return (
        <main>
            <SignupForm/>
        </main>
    )
}