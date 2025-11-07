import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

type submissionState = {
    error: string | null
}

export async function submitBlog(prevState: submissionState, formData:FormData): Promise<submissionState> {
    const supabase = createClient();

    const blogTitle = formData.get("title");
    const blogContent = formData.get("blog-content");
    const blogShort = formData.get("blog-preview");

    const {error} = await supabase.from("blogsubmissions").insert({
        blogtitle:blogTitle,
        blogpreview:blogShort,
        blogcontent:blogContent
    })

    if (error) {
        return {error:error.message}
    };

    redirect('/submit-blog/success')
    return {error: null}
}