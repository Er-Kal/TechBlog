import { retrieveBlog } from "@/services/selectSpecificBlog";
import { BlogType } from "@/types/blog";
import Blog from "@/app/blog/[id]/blog";
import LikeCounter from "./LikeCounter";


export default async function BlogPage({ params }: { params: { id: string } }) {
	const data = await params;
	const blogId: number = Number(data.id);
	const blogData: BlogType | null = await retrieveBlog(blogId);

	if (!blogData) {
		return (
			<main>
				<p>Loading or blog not found...</p>
			</main>
		);
	}
	return (
		<main>
			<Blog
				author_id={blogData.author_id}
				content={blogData.content}
				date_created={blogData.created_at}
			/>
			<p>These are the likes</p>
			<LikeCounter id={blogId}/>
			<p>These are the comments</p>
		</main>
	);
}
