"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
	const supabase = createClient();

	const {
		data: { session },
	} = await (await supabase).auth.getSession();

	if (session) {
		redirect("/");
	}

	return (
		<main>
			<LoginForm />
		</main>
	);
}
