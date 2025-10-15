"use client";

import { createClient } from "@/utils/supabase/client";

type pfpState = {
	error: string | null;
	url: string | null;
};

export async function uploadProfilePicture(file: File): Promise<pfpState> {
	const supabase = await createClient();
	const fileExtension = file.name.split(".")[1];
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			error: "There was an error with authorisation or authentication",
			url: null,
		};
	}
	const filePath = `${user.id}.${fileExtension}`;

	const { error: uploadError } = await supabase.storage
		.from("profilepics")
		.upload(filePath, file, { upsert: true });

	if (uploadError) {
		return { error: uploadError.message, url: null };
	}

	//get the url path
	const { data: publicUrlData } = await supabase.storage
		.from("profilepics")
		.getPublicUrl(filePath);

	if (!publicUrlData) {
		return { error: "There was an error with the URL retrieval", url: null };
	}
	const { error: updateProfileError } = await supabase
		.from("profiles")
		.update({ avatar_url: publicUrlData.publicUrl })
		.eq("id", user.id);

	if (updateProfileError) {
		return { error: updateProfileError.message, url: null };
	}

	return { error: null, url: publicUrlData.publicUrl };
}
