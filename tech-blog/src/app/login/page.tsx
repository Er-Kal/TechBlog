"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await (await supabase).auth.getUser();

	if (user) {
		redirect("/");
	}

	return (
		<main>
			<LoginForm />
		</main>
	);
}
