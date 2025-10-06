import { retrieveBlog } from "@/services/selectSpecificBlog";
import { BlogType } from '../../../types/blog'
import Blog from "@/app/blog/[id]/blog";

export default async function BlogPage({params}: {params: {id:string}}){
    const data = await params;
    const blogId: number = parseInt(data.id);
    const blogData: BlogType | null = await retrieveBlog(blogId);

    if (!blogData){
        return <main><p>Loading or blog not found...</p></main>
    }
    return (<main>
        <Blog author={blogData.author} content={blogData.content} date_created={blogData.created_at} />
        <p>These are the likes</p>
        <p>These are the comments</p>
    </main>)
}