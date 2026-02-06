"use client";

import { ProfileType } from "@/types/profile";
import { retrieveProfile } from "@/services/selectSpecificProfile";
import styles from "./header.module.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
	const supabase = createClient();
	const [user, setUser] = useState<User | null>(null);
	const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
	const pathname = usePathname();
	const [profileData, setProfileData] = useState<ProfileType | null>(null);

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

	useEffect(() => {
		const getProfileData = async () => {
			if (user){
				const userData = await retrieveProfile(user.id);
				setProfileData(userData);
			}
		}
		getProfileData();
	})

	const handleLogout = async () => {
		await supabase.auth.signOut();
		await refreshAuthState();
		sessionStorage.clear();
		location.reload();
	};

	const handleBurgerClick = () => {
		setBurgerOpen(!burgerOpen);
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
						<a style={{ cursor: "pointer" }} onClick={handleLogout}>
							Log Out
						</a>
					</>
				) : (
					<Link href="/login">Login</Link>
				)}
			</nav>
			<div className={styles.hamburger}>
				<RxHamburgerMenu size={24} onClick={handleBurgerClick} />
				{burgerOpen && (
					<div className={styles.hamburgerOpen}>
						<Link href="/">Home</Link>
						<Link href="/about">About</Link>
						{user ? (
							<>
								<Link href={"/profile/" + user.id}>Profile</Link>
								<a style={{ cursor: "pointer" }} onClick={handleLogout}>
									Log Out
								</a>
							</>
						) : (
							<Link href="/login">Login</Link>
						)}
					</div>
				)}
			</div>
		</header>
	);
}
