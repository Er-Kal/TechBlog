import { createClient } from "../utils/supabase/client";
import { BlogType } from "@/types/blog";

export async function retrieveBlog(id: number) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("blogs")
		.select("*")
		.eq("id", id)
		.limit(1);

	if (error) {
		console.error("There was an error fetching the blog:", error);
		return null;
	}
	if (!data || data.length === 0) {
		return null;
	}
	return data[0] as BlogType;
}
