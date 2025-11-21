"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import styles from "./blog.module.css";
import BlogContent from "@/components/BlogContent";

type Props = {
	author_id: string;
	content: string;
	date_created: string;
};

// Handles the outline of the blog content, author's details, blog text
export default function Blog(props: Props) {
	const [authorName, setAuthorName] = useState<string>("");
	const supabase = createClient();
	useEffect(() => {
		async function retrieveAuthorName() {
			const { data } = await supabase
				.from("profiles")
				.select("username")
				.eq("id", props.author_id)
				.single();
			setAuthorName(data!.username);
		}
		retrieveAuthorName();
	}, [props, supabase]);

	const createdDate = new Date(props.date_created);
	const displayDate = createdDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const isoDate = createdDate.toISOString();

	return (
		<article>
			<div className={styles.blogDetails}>
				<address className="author">
					Author:{" "}
					<Link href={"/profile/" + props.author_id} rel="author">
						{authorName}
					</Link>
				</address>
				<p>
					Posted: <time dateTime={isoDate}>{displayDate}</time>
				</p>
			</div>
			<BlogContent blogText={props.content}/>
		</article>
	);
}
