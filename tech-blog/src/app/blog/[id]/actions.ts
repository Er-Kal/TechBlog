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

	const {data} = await supabase
	.from('blogcomments')
	.select(`
		*,
		profiles(
			username
		)
		`)
	.eq(
		'blog_id',blogId
	)

	const comments = data?.map((comment)=>{
		return {
			id:comment.id,
			authorId:comment.author,
			content:comment.content,
			author:comment.profiles.username,
			created_at:comment.created_at,
		}
	})

	return comments;
}

export async function getAuthor(userId: string){
	const supabase = createClient();

	return {username:"erikska"};
}