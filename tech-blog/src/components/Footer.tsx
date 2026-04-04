import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.content}>
					<p className={styles.copyright}>
						© {new Date().getFullYear()} Tech Blog. All rights reserved.
					</p>
					<nav className={styles.nav}>
						<Link href="/" className={styles.link}>
							Home
						</Link>
						<Link href="/about" className={styles.link}>
							About
						</Link>
						<Link href="/submit-blog" className={styles.link}>
							Submit Blog
						</Link>
						<a
							href="https://github.com/Er-Kal"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.link}
						>
							GitHub
						</a>
					</nav>
				</div>
			</div>
		</footer>
	);
}
