"use client";

import { retrieveProfile } from "@/services/selectSpecificProfile";
import { ProfileType } from "@/types/profile";
import {
	retrieveUsersBlogs,
	retrieveLikedBlogs,
	submission,
	retrieveBlogSubmissions,
} from "./actions";
import BlogListing from "./blogListing";
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
	const [likedBlogs, setLikedBlogs] = useState<BlogType[] | null>(null);
	const [submissions, setSubmissions] = useState<submission[] | null>(null);
	const params = useParams();
	const id = params.id as string;

	// Get profile data
	useEffect(() => {
		const getProfileData = async () => {
			const data = await retrieveProfile(id);
			setProfileData(data);
		};
		getProfileData();
	}, [id]);

	// Get currently logged in user
	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user ?? null);
		};
		getUser();
	}, [supabase]);

	// Get authored blogs
	useEffect(() => {
		const getAuthoredBlogs = async () => {
			const data = await retrieveUsersBlogs(id);
			setAuthoredBlogs(data);
		};
		getAuthoredBlogs();
	}, [supabase, id]);

	// Get user's liked blogs
	useEffect(() => {
		const getLikedBlogs = async () => {
			const data = await retrieveLikedBlogs(id);
			setLikedBlogs(data);
		};
		getLikedBlogs();
	}, [supabase, id]);

	// Get Blog Submissions if the user is logged in

	useEffect(() => {
		const getBlogSubmissions = async () => {
			const data = await retrieveBlogSubmissions(id);
			setSubmissions(data);
		};

		if (user && user.id == id) {
			getBlogSubmissions();
		}
	}, [supabase, id, user]);

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
				role={profileData.role}
			/>
			<div className={styles.userActivity}>
				{user && user.id == id && (
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
									submission={false}
								/>
							))}
						</ul>
					</div>
				)}
				<div className="likedBlogs">
					{likedBlogs && (
						<div>
							<p>Liked Blogs</p>
							<ul>
								{likedBlogs.reverse().map((blogData) => (
									<BlogListing
										key={blogData.id}
										created_at={blogData.created_at}
										title={blogData.title}
										id={blogData.id}
										submission={false}
									/>
								))}
							</ul>
						</div>
					)}
				</div>
				<div className="submissions">
					{submissions && (
						<div>
							<p>Blog Submissions</p>
							<ul>
								{submissions.reverse().map((blogData) => (
									<BlogListing
										key={blogData.id}
										created_at={blogData.created_at}
										title={blogData.blogtitle}
										id={blogData.id}
										submission={true}
									/>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
