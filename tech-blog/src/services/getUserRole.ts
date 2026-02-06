import { createClient } from "@/utils/supabase/client";
import { retrieveProfile } from "./selectSpecificProfile";

export async function retrieveUserRole(){
    const supabase = await createClient();
    const {data} = await supabase.auth.getUser();
    if (!data.user){
        return null;
    }
    const profileData = await retrieveProfile(data.user.id);
    if (profileData){
        return profileData.role;
    }
    return null;
}