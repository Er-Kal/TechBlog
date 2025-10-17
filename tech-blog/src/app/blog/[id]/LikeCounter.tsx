"use client";

import { FaRegThumbsUp } from "react-icons/fa";
import styles from "./blog.module.css";
import { useState, useEffect } from "react";
import { getLikes, likeBlog } from "./actions";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type Props = {
	id: number;
};

export default function LikeCounter(props: Props) {
	const [likes, setLikes] = useState<number>(0);
    const [user, setUser] = useState<User | null>();
    const supabase = createClient();

    useEffect(() =>{
        const getUser = async () =>{
            const {data:{user}} = await supabase.auth.getUser();
            setUser(user);
        }
        getUser();
    })

	const getLikeCount = async () => {
		const amount = await getLikes(props.id);
		setLikes(amount);
	};

	useEffect(() => {
		getLikeCount();
	});

	const likeClicked = () => {
		likeBlog(props.id);
        getLikeCount();
	};

	return (
		<div className={styles.likeContainer}>
			<FaRegThumbsUp />
			<p>{likes} </p>
            {user && <button onClick={likeClicked}>Like</button>}
		</div>
	);
}
