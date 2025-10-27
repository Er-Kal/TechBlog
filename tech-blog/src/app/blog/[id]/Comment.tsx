import styles from "./blog.module.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { deleteUserComment } from "./actions";

type Props = {
	content: string;
	commentId:number;
	created_at: string;
	author: string;
	authorId: string;
	userId: string | null;
	visible: boolean;
};

export default function Comment(props: Props) {
	const createdDate = new Date(props.created_at);
	const displayDate = createdDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const supabase = createClient();
	const [visible,setVisibility] = useState<boolean>(props.visible)

	const deleteComment = () => {
		setVisibility(false);
		deleteUserComment(props.commentId)
	}

	return visible ? (
		<div className={styles.commentContainer}>
			<div className={styles.commentHead}>
				<Link href={`/profile/${props.authorId}`}>{props.author}</Link>
				<p>{displayDate}</p>
				{(props.userId === props.authorId) ? <button className={styles.deleteCommentButton} onClick={deleteComment}><img src="@/"/></button> : <></>}
				
			</div>
			<p>{props.content}</p>
		</div>
	): (<></>);
}
