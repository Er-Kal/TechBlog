import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>{new Date().getFullYear()} Tech Blog</p>
			<nav className={styles.nav}>
				<Link href="/contact">Contact</Link>
				<Link href="https://github.com/Er-Kal">Github</Link>
			</nav>
		</footer>
	);
}
