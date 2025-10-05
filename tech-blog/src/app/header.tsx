'use client'

import styles from '../styles/header.module.css'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function Header(){
    const supabase = createClient();
    const [user,setUser] = useState<User | null>();

    useEffect(()=>{
        const getUser = async () =>{
            const {data: {user}} = await supabase.auth.getUser();
            setUser(user!);
        }
        getUser();

        const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        })

        return () =>{
            listener.subscription.unsubscribe();
        }
    },[supabase]);

    const handleLogout = async () =>{
        await supabase.auth.signOut();
        setUser(null);
    }

    return (
        <header className={styles.header}>
            <h1>DevGlobe</h1>
            <nav className={styles.nav}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                {user ? (
                    <button onClick={handleLogout}>Log Out</button>
                ) :
                (
                <Link href="/login">Login</Link>)}
            </nav>
        </header>
    )
}