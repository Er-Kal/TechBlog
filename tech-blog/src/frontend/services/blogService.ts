import {supabase} from './supabaseClient'

export async function getLatestBlogs(limit: number = 5){
    const {data, error} = await supabase.from('blogs').select('*').order('created_at',{ascending:false}).limit(limit);
    
    if (error) {
        console.error("There was an error fetching the latest blogs:",error)
        return [];
    }
    return data;
}