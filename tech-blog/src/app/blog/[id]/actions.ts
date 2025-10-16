import { createClient } from "@/utils/supabase/client";

export async function likeBlog(blogId:number){
    const supabase = await createClient();
    
    const {error:likeError} = await supabase.from('bloglikes').insert({blogId});
}