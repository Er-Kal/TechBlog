import styles from '../styles/header.module.css'

export default function Header(){
    return (
        <header className={styles.header}>
            <h1>DevGlobe</h1>
            <nav className={styles.nav}>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </nav>
        </header>
    )
}