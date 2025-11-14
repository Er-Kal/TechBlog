"use client";

import { retrieveProfile } from "@/services/selectSpecificProfile";
import { ProfileType } from "@/types/profile";
import { retrieveUsersBlogs } from "@/services/selectUsersBlogs";
import BlogListing from "./authoredBlogListing";
import styles from "./profile.module.css";
import ProfileLayout from "./profileLayout";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { BlogType } from "@/types/blog";

export default function ProfilePage() {
	const supabase = createClient();
	const [user, setUser] = useState<User | null>(null);
	const [profileData, setProfileData] = useState<ProfileType | null>(null);
	const [authoredBlogs, setAuthoredBlogs] = useState<BlogType[] | null>(null);
	const params = useParams();
	const id = params.id as string;

	useEffect(() => {
		const getProfileData = async () => {
			const data = await retrieveProfile(id);
			setProfileData(data);
		};
		getProfileData();
	}, [id]);

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user ?? null);
		};
		getUser();
	}, [supabase]);

	useEffect(() => {
		const getAuthoredBlogs = async () => {
			const data = await retrieveUsersBlogs(id);
			setAuthoredBlogs(data);
		};
		getAuthoredBlogs();
	}, [supabase, id]);

	if (!profileData) {
		return <p>Loading profile, or this user doesn&apos;t exist...</p>;
	}

	return (
		<main className={styles.main}>
			<ProfileLayout
				username={String(profileData.username)}
				id={id}
				avi_url={profileData.avatar_url}
				bio={profileData.bio}
				created_at={new Date(profileData.created_at).toLocaleDateString()}
			/>
			<div className={styles.userActivity}>
				{user && (
					<button>
						<Link href={"/submit-blog/"}>Submit Blog</Link>
					</button>
				)}
				{authoredBlogs && (
					<div>
						<p>Authored Blogs</p>
						<ul>
							{authoredBlogs.reverse().map((blogData) => (
								<BlogListing
									key={blogData.id}
									created_at={blogData.created_at}
									title={blogData.title}
									id={blogData.id}
								/>
							))}
						</ul>
					</div>
				)}
				<div className="likedBlogs">
					<p>Liked Blogs</p>
				</div>
			</div>
		</main>
	);
}
