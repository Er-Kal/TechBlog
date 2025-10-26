"use client";

import { User } from "@supabase/supabase-js";
import { getComments } from "./actions";
import Comment from "./Comment";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { submitComment } from "./actions";
import styles from './blog.module.css'

type Props = {
	blogId: number;
};

type CommentData = {
	id: number;
	created_at: string;
	content: string;
	author: string;
	authorId: string;
};

type commentState = {
	error: string | null;
};

export default function Comments(props: Props) {
	const [comments, setComments] = useState<CommentData[] | null>([]);
	const [user, setUser] = useState<User | null>();
	const supabase = createClient();

	const [commentState, commentAction] = useActionState<commentState, FormData>(
		submitComment,
		{
			error: null,
		}
	);

	useEffect(() => {
		getComments(props.blogId).then((comments) => setComments(comments ?? null));
	}, [props.blogId]);

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user ?? null);
		};
		getUser();
	},[supabase]);

	useEffect(() =>{
		const channel = supabase
		.channel(`blogcomments-${props.blogId}`)
		.on("postgres_changes",
			{
				event:"INSERT",
				schema:"public",
				table:"blogcomments",
				filter: `blog_id=eq.${props.blogId}`
			}
			, async (payload) =>{

			const {data} = await supabase.from('profiles').select("username").eq("id",payload.new.author).single()
			if (!data) return;
			
			const newComment:CommentData = {
				"author":data.username,
				"authorId":payload.new.author,
				"content":payload.new.content,
				"created_at":payload.new.created_at,
				"id":payload.new.id,
			} 
			setComments(comments => 
				comments ? [newComment,...comments] : [newComment])
		})
		.subscribe()

		return () => {
			supabase.removeChannel(channel);
		}
	},[props.blogId,supabase])


	const hasComments = comments != null && comments.length > 0;

	return (
		<div className="comment-section">
			<div className="create-comment"></div>
			<div className="comment-list">
				<h2>Comments</h2>
				{user && (
					<form className={styles.createCommentContainer} action={commentAction}>
						<label>Write a comment</label>
						<textarea className={styles.createCommentBox} name="commentText" required />
						<input type="hidden" value={props.blogId} name="blogId"/>
						<button type="submit">Submit Comment</button>
						{commentState.error && (<p>{commentState.error}</p>)}
					</form>
				)}

				{hasComments ? (
					<>
						{comments.map((comment) => (
							<Comment
								key={comment.id}
								commentId={comment.id}
								content={comment.content}
								author={comment.author}
								created_at={comment.created_at}
								authorId={comment.authorId}
								userId={user ? user.id : null}
								visible={true}
							/>
						))}
					</>
				) : (
					<p>There are no comments on this blog</p>
				)}
			</div>
		</div>
	);
}
