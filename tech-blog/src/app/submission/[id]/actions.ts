import { BlogSubmissionType } from "@/types/blogsubmission";
import { createClient } from "@/utils/supabase/client";


export async function rejectSubmission(id:String){
    const supabase = await createClient();

    await supabase.from("blogsubmissions").update({status:'rejected'}).eq('id',id);
}

export async function acceptSubmission(id:string){
    const supabase = await createClient();

    const {data, error} = await supabase.from('blogsubmissions').select('*').eq('id',id).single();

    if (error){
        console.error(error.message);
        return;
    }

    if (!data){
        console.error("Data not found")
        return;
    }

    const submission = data as BlogSubmissionType;

    const newBlog = {
        content:submission.blogcontent,
        preview_content:submission.blogpreview,
        author_id:submission.author,
        title:submission.blogtitle
    }
    await supabase.from('blogs').insert(newBlog);
    await supabase.from('blogsubmissions').update({status: "acceptect"}).eq('id',id);
}