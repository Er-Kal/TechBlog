"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

type LoginState = {
	error: string | null;
};

export async function login(
	prevState: LoginState,
	formData: FormData
): Promise<LoginState> {
	const supabase = await createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		return { error: error.message};
	}

	revalidatePath("/", "layout");
	revalidatePath("/");


	return {error: null}
}
