'use server'

import SignupForm from './SignupForm'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function SignUpPage() {
    const supabase = createClient();
    
    const {data: {user}} = await (await supabase).auth.getUser();

    if (user){
        redirect('/')
    }
    
    return (
        <main>
            <SignupForm/>
        </main>
    )
}