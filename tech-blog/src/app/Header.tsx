"use client";

import styles from "./header.module.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

export default function Header() {
	const supabase = createClient();
	const [user, setUser] = useState<User | null>(null);
	const pathname = usePathname();

	const refreshAuthState = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		setUser(user ?? null);
	};

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user ?? null);
		};
		getUser();

		const { data: listener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				setUser(session?.user ?? null);
			}
		);

		return () => {
			listener.subscription.unsubscribe();
		};
	}, [supabase]);

	useEffect(() => {
		const refreshAuthState = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user ?? null);
		};
		refreshAuthState();
	}, [pathname, supabase]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		await refreshAuthState();
		sessionStorage.clear();
		location.reload();
	};

	return (
		<header className={styles.header}>
			<h1>DevGlobe</h1>
			<nav className={styles.nav}>
				<Link href="/">Home</Link>
				<Link href="/about">About</Link>
				{user ? (
					<>
						<Link href={"/profile/" + user.id}>Profile</Link>
						<Link href={"/submit-blog/"}>Submit Blog</Link>
						<a style={{ cursor: "pointer" }} onClick={handleLogout}>
							Log Out
						</a>
					</>
				) : (
					<Link href="/login">Login</Link>
				)}
			</nav>
		</header>
	);
}
