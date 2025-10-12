"use server";

import { createClient } from "@/utils/supabase/server";

type BioState = {
	error: string | null;
};

export async function submitBioChange(
	prevState: BioState | null,
	formData: FormData
): Promise<BioState> {
	try {
		const supabase = await createClient();
		const bio = formData.get("bio") as string;

		if (bio.length > 200) {
			return { error: "Your bio was too long" };
		}
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			return {
				error: "There was an error with authentication or authorisation",
			};
		}

		const { error: updateError } = await supabase
			.from("profiles")
			.update({ bio: bio.trim() })
			.eq("id", user.id)
			.select();

		if (updateError) {
			return {
				error: "There was an error updating your bio\n" + updateError.message,
			};
		}

		return { error: null };
	} catch (error) {
		const Error = error as Error;
		return { error: Error.message };
	}
}
