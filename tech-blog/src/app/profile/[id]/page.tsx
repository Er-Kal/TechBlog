import { retrieveProfile } from "@/services/selectSpecificProfile";
import { ProfileType } from "@/types/profile";
import { retrieveUsersBlogs } from "@/services/selectUsersBlogs";
import BlogListing from "./authoredBlogListing";
import styles from "./profile.module.css";
import ProfileLayout from "./profileLayout";

export default async function ProfilePage({
	params,
}: {
	params: { id: string };
}) {
	const paramsData = await params;
	const id = paramsData.id as string;
	const profileData: ProfileType | null = await retrieveProfile(id);

	if (!profileData) {
		return <p>Loading profile, or this user doesn&apos;t exist...</p>;
	}

	const authoredBlogs = await retrieveUsersBlogs(id);

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
				{authoredBlogs && (
					<div className="authored">
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
