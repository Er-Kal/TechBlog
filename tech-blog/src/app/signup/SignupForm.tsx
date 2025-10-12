"use client";

import { signup } from "./actions";
import { useActionState } from "react";
import Link from "next/link";
import styles from "./signup.module.css";

type SignupState = {
	error: string | null;
};

export default function SignupForm() {
	const [state, formAction] = useActionState<SignupState, FormData>(signup, {
		error: null,
	});

	return (
		<div className={styles.formDiv}>
			<form action={formAction} className={styles.form}>
				<label htmlFor="username">Username</label>
				<input
					className={styles.formInput}
					id="username"
					name="username"
					type="username"
					required
				/>

				<label htmlFor="email">Email</label>
				<input
					className={styles.formInput}
					id="email"
					name="email"
					type="email"
					required
				/>

				<label htmlFor="password">Password</label>
				<input
					className={styles.formInput}
					id="password"
					name="password"
					type="password"
					required
				/>

				<button type="submit"> Sign Up </button>
				{state.error && <p>{state.error}</p>}
			</form>
			<p>Already have an account? </p>
			<Link href="/login">
				<button>Login</button>
			</Link>
		</div>
	);
}
