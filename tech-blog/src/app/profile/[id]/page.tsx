import { retrieveProfile } from "@/services/selectSpecificProfile"
import { ProfileType } from "@/types/profile"
import Image from "next/image";
import { retrieveUsersBlogs } from "@/services/selectUsersBlogs";
import BlogListing from "./authoredBlogListing";
import styles from './profile.module.css'

export default async function ProfilePage({params}: {params:{id:string}}){
    const paramsData = await params;
    const id = paramsData.id;
    const profileData: ProfileType | null = await retrieveProfile(id);

    if (!profileData){
        return (<p>Loading profile, or this user doesn&apos;t exist...</p>)
    }

    const authoredBlogs = await retrieveUsersBlogs(id);

    return(<main className={styles.main}>
        <div>
            <p>{profileData.username}</p>
            <Image src={profileData.avatar_url} width={196} height={196} alt="Profile picture" unoptimized/>
            <p>{profileData.bio}</p>
            <p>Created At: {new Date(profileData.created_at).toLocaleDateString()}</p>
        </div>
        <div className={styles.userActivity}>
            {authoredBlogs && (
                <div className="authored">
                    <p>Authored Blogs</p>
                    <ul>
                        {authoredBlogs.map((blogData) => (<BlogListing key={blogData.id} created_at={blogData.created_at} title={blogData.title} id={blogData.id}/>))}
                    </ul>
                </div>
            )}
            <div className="likedBlogs">
                <p>Liked Blogs</p>
            </div>
        </div>
    </main>)
}