import { createClient } from "@/utils/supabase/client";
import { BlogType } from "@/types/blog";

type LikeEntry = {
    likeid: number;
    created_at: string;
    blogid: number;
    user_id: string;
}

export type submission = {
    id: number;
    created_at: string;
    blogtitle: string;
    status: string;
}

export async function retrieveUsersBlogs(id: string): Promise<BlogType[] | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("author_id", id);

    if (error) {
        console.error("There was an error fetching the blogs:", error);
        return null;
    }
    if (!data || data.length === 0) {
        return null;
    }
    return data as BlogType[];
}

export async function retrieveLikeEntries(id:string): Promise<LikeEntry[] | null>{
    const supabase = createClient();
    
    const { data, error } = await supabase
        .from("bloglikes")
        .select("*")
        .eq("user_id", id);

    if (error) {
        console.error("There was an error fetching the blogs:", error);
        return null;
    }
    if (!data || data.length === 0) {
        return null;
    }

    return data as LikeEntry[];
}

export async function retrieveLikedBlogs(id: string): Promise<BlogType[] | null> {
    const supabase = createClient();
    let blog_ids:number[] = [];

    const likes = await retrieveLikeEntries(id);
    if (likes == null){
        return null;
    }

    for (const like of likes){
        blog_ids = [...blog_ids, like.blogid];
    }

    const {data, error} = await supabase
    .from('blogs')
    .select('*')
    .in('id',blog_ids);

    if (error) {
        console.error("There was an error fetching the blogs:", error);
        return null;
    }
    if (!data || data.length === 0) {
        return null;
    }

    return data as BlogType[];
}

export async function retrieveBlogSubmissions(id: string): Promise<submission[] | null>{
    const supabase = createClient();

    const {data, error} = await supabase
    .from('blogsubmissions')
    .select('id,created_at,blogtitle,status')
    .eq('author',id);

    if (error) {
        console.error("There was an error fetching the blogs:", error);
        return null;
    }
    if (!data || data.length === 0) {
        return null;
    }

    return data as submission[];
}