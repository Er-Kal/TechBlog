'use server'

import { retrieveProfile } from "@/services/selectSpecificProfile";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SubmissionsList from "./SubmissionsList";


export default async function SubmittedBlogsPage(){
    const supabase = await createClient();
    const {user} = (await supabase.auth.getUser()).data;
    if (!user){
        redirect("/");
    }
    const profileData = await retrieveProfile(user.id);
    if (profileData?.role!="admin"){
        redirect("/");
    }
    return(<main>
        <SubmissionsList/>
    </main>);
}