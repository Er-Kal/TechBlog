"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LoginForm from "./LoginForm";

// Login page, redirects if the user is already logged in

export default async function Page() {
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
