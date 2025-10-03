import {useRouter} from "next/router";
import { retrieveBlog } from "@/services/selectSpecificBlog";
import { useEffect,useState } from "react";
import { BlogType } from '../../types/blog'
import Blog from "@/components/blog";

export default function BlogPage(){
    const router = useRouter();
    const id:number = parseInt(router.query.id as string);
    const [blogData, setBlogData] = useState<BlogType | null>(null);

    useEffect(()=>{
        if (router.query.id){
            const id = parseInt(router.query.id as string);
            if (!isNaN(id)){
                retrieveBlog(id).then(setBlogData);
            }
        }
    },[router.query.id])

    if (!blogData){
        return <main><p>Loading or blog not found...</p></main>
    }
    return (<main>
        <Blog author={blogData.author} content={blogData.content} date_created={blogData.created_at} />
        <p>These are the likes</p>
        <p>These are the comments</p>
    </main>)
}