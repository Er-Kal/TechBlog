import { createClient } from "@/utils/supabase/client";

export async function likeBlog(blogId: number) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return;
	}

	const { data: likeFound } = await supabase
		.from("bloglikes")
		.select("*")
		.eq("blogid", blogId)
		.eq("user_id", user.id);

	if (likeFound!.length>0) {
		await supabase
			.from("bloglikes")
			.delete()
			.eq("blogid", blogId)
			.eq("user_id", user.id);
		return;
	}

	await supabase.from("bloglikes").insert({ blogid: blogId });

	return;
}

export async function getLikes(blogId: number) {
	const supabase = await createClient();

	const { data: count } = await supabase
		.from("bloglikes")
		.select("*", { count: "exact" })
		.eq("blogid", blogId);

	if (!count) {
		return 0;
	}
	return count.length;
}
