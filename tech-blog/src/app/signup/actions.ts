'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/adminClient'

type SignupState = {
  error: string | null
}

export async function signup(
  prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const supabase = await createClient()
  const supabaseAdmin = await createAdminClient();

  const formsData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
  }

  const { error,data } = await supabase.auth.signUp({email:formsData.email,password:formsData.password})

  if (error) {
    return {error:error.message}
  }
  if (!data.user){
    return {error:'user not created'}
  }

  const {error: profileError} = await supabaseAdmin
  .from('profiles')
  .insert([
    {
      id:data.user.id,
      username:formsData.username,
      bio:'',
      avatar_url:'https://placehold.co/100x100',
    }
  ])

  if (profileError){
    return {error:profileError.message}
  }

  revalidatePath('/', 'layout')
  redirect('/')
}