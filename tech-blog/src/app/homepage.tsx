"use client";

import { useEffect, useState } from "react";
import { getLatestBlogs } from "../services/recentBlogService";
import BlogPreview from "./blogpreview";
import { BlogType } from "@/types/blog";

export default function HomePage() {
	const [blogs, setBlogs] = useState<BlogType[] | null>([]);
	useEffect(() => {
		getLatestBlogs(5).then(setBlogs);
	}, []);
	console.log(getLatestBlogs(5));
	return (
		<div>
			<h2>Latest Blogs</h2>
			<ul>
				{blogs!.map((blog) => (
					<BlogPreview
						key={blog.id}
						blogId={blog.id}
						previewContent={blog.preview_content}
						author_id={blog.author_id}
					></BlogPreview>
				))}
			</ul>
		</div>
	);
}
