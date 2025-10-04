import { BlogType } from '@/types/blog';
import {createClient} from '../utils/supabase/client'

export async function getLatestBlogs(limit: number = 5){
    const supabase = createClient()
    const {data, error} = await supabase.from('blogs').select('*').order('created_at',{ascending:false}).limit(limit);
    
    if (error) {
        console.error("There was an error fetching the latest blogs:",error)
        return null;
    }
    if (!data || data.length===0){
        return null;
    }
    return (data as BlogType[]);
}