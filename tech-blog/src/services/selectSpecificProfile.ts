import { createClient } from "@/utils/supabase/client";
import { ProfileType } from "@/types/profile";

export async function retrieveProfile(id: string) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", id)
		.limit(1);

	if (error) {
		console.log("There was an error fetching this profile");
		return null;
	}
	if (!data || data.length === 0) {
		return null;
	}
	return data[0] as ProfileType;
}
