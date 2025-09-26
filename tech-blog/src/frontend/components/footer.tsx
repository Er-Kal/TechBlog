import styles from './footer.module.css'

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <p>{new Date().getFullYear()} Tech Blog</p>
            <nav className={styles.nav}>
                <a href="/contact">Contact</a>
                <a href="https://github.com/Er-Kal">Github</a>
            </nav>
        </footer>
    )
}