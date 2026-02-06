import { BlogSubmissionType } from "@/types/blogsubmission";
import { createClient } from "@/utils/supabase/client";


export async function getLatestSubmissions(){
    const supabase = createClient();
    const {data, error} = await supabase
        .from('blogsubmissions')
        .select('*')
		.order("created_at", { ascending: false })
        .eq('status','pending');
    
    return data as BlogSubmissionType[];
}