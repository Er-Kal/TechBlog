"use client";

import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import styles from "./blog.module.css";

type Props = {
	author_id: string;
	content: string;
	date_created: string;
};

export default function Blog(props: Props) {
	const [html, setHTML] = useState<string>("");
	const [authorName, setAuthorName] = useState<string>("");
	const supabase = createClient();
	useEffect(() => {
		async function convertStringToHTML() {
			const convertedHTML: string = await marked.parse(props.content);
			const sanitisedHTML = await DOMPurify.sanitize(convertedHTML);
			setHTML(sanitisedHTML);
		}
		convertStringToHTML();
		async function retrieveAuthorName() {
			const { data } = await supabase
				.from("profiles")
				.select("username")
				.eq("id", props.author_id);
			setAuthorName(data![0].username);
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
			<div dangerouslySetInnerHTML={{ __html: html }}></div>
		</article>
	);
}
