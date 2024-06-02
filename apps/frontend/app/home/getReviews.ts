"use server";
import { createClient } from '../utils/supabase/client';
import createSupabaseServerClient from '../../libs/supabase/server';

const getReviews = async (location_id: any) => {
    console.log("(" + typeof location_id + ") Recieved id: " + location_id)
    console.log()
    const supabase = await createSupabaseServerClient();
            
    const { data: reviewData, error: reviewErr } = await supabase
        .from('reviews')
        .select("user_name, review_text, rating, review_title")
        .eq('destination_id', location_id.trim())

    // console.log("Review Error: " + JSON.stringify(reviewErr))
    // console.log("Review Data: " + JSON.stringify(reviewData))

    return reviewData;
}
export default getReviews;