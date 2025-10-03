import styles from '../styles/header.module.css'
import Link from 'next/link'

export default function Header(){
    return (
        <header className={styles.header}>
            <h1>DevGlobe</h1>
            <nav className={styles.nav}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    )
}