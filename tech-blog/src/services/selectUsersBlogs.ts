import { createClient } from "../utils/supabase/client";
import { BlogType } from "@/types/blog";

export async function retrieveUsersBlogs(id: string): Promise<BlogType[] | null> {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("blogs")
		.select("*")
		.eq("author_id", id);

	if (error) {
		console.error("There was an error fetching the blog:", error);
		return null;
	}
	if (!data || data.length === 0) {
		return null;
	}
	return data as BlogType[];
}
