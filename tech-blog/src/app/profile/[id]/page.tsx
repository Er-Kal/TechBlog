import { retrieveProfile } from "@/services/selectSpecificProfile"
import { ProfileType } from "@/types/profile"
import Image from "next/image";

export default async function ProfilePage({params}: {params:{id:string}}){
    const paramsData = await params;
    const id = paramsData.id;
    const profileData: ProfileType | null = await retrieveProfile(id);

    if (!profileData){
        return (<p>Loading profile, or this user doesn&apos;t exist...</p>)
    }

    return(<main>
        <p>{profileData.username}</p>
        <Image src={profileData.avatar_url} width={256} height={256} alt="Profile picture" unoptimized/>
        <p>{profileData.bio}</p>
        <p>Created At: {new Date(profileData.created_at).toLocaleDateString()}</p>
    </main>)
}