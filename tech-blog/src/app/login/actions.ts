'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  console.log('Login attempt started')
  
  const supabase = await createClient()
  console.log('Supabase client created')

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  
  console.log('Attempting login with email:', data.email)

  const { error } = await supabase.auth.signInWithPassword(data)
  
  if (error) {
    console.error('Login error details:', error)
    redirect('/error')
  }

  console.log('Login successful')
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  console.log('Signup attempt started')
  
  const supabase = await createClient()
  console.log('Supabase client created')

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  
  console.log('Attempting signup with email:', data.email)

  const { error } = await supabase.auth.signUp(data)
  
  if (error) {
    console.error('Signup error details:', error)
    redirect('/error')
  }

  console.log('Signup successful')
  revalidatePath('/', 'layout')
  redirect('/')
}