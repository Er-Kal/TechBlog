import { createClient } from "@/utils/supabase/client";


// State for comment form action, stores if there is an error or not.
type commentState = {
	error: string | null;
};

// Function which handles liking blog posts.
// Essentially checks if the user is logged in
// If logged in, check if they have already liked the post
// 		If liked: remove the like
// 		If not liked: add a row into the database to store the user's like
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

	if (likeFound!.length > 0) {
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

export async function getComments(blogId: number) {
	const supabase = createClient();

	const { data } = await supabase
		.from("blogcomments")
		.select(
			`
		*,
		profiles(
			username
		)
		`
		)
		.order("created_at", { ascending: false })
		.eq("blog_id", blogId);

	const comments = data?.map((comment) => {
		return {
			id: comment.id,
			authorId: comment.author,
			content: comment.content,
			author: comment.profiles.username,
			created_at: comment.created_at,
		};
	});

	return comments;
}

export async function submitComment(
	prevState: commentState,
	formData: FormData
): Promise<commentState> {
	const supabase = createClient();

	const blogId = formData.get("blogId");
	const commentText = formData.get("commentText");

	const { error } = await supabase
		.from("blogcomments")
		.insert({ content: commentText, blog_id: blogId });
	if (error) {
		return {error:error.message};
	} 
	return { error: null };
}

export async function deleteUserComment(commentId: number){
	const supabase = createClient();
	const {data: {user}} = await supabase.auth.getUser();
	if (!user) {
		return;
	}
	await supabase.from("blogcomments").delete().eq("id", commentId);
}