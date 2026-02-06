import { createClient } from "@/utils/supabase/client";


export async function rejectSubmission(id:String){
    const supabase = await createClient();

    await supabase.from("blogsubmissions").update({status:'rejected'}).eq('id',id);
}