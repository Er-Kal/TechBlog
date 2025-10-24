'use client'

import { getComments } from "./actions";
import Comment from "./Comment";

import { useEffect, useState } from "react";

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

export default function Comments(props: Props) {
	const [comments, setComments] = useState<CommentData[] | null>([]);

	useEffect(() => {
		getComments(props.blogId).then((comments) => setComments(comments ?? null));
	}, [props.blogId]);

    const hasComments = comments != null && comments.length>0

	return (
		<div className="comment-section">
			<div className="create-comment"></div>
			<div className="comment-list">
				{hasComments &&
					comments.map((comment) => (
						<Comment
							key={comment.id}
							content={comment.content}
							author={comment.author}
							created_at={comment.created_at}
                            authorId={comment.authorId}
						/>
					))}
			</div>
		</div>
	);
}
