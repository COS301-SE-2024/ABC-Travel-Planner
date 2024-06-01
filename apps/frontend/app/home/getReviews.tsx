import { createClient } from '../utils/supabase/client';

interface Review {
    destination : any
}

const getReviews = async (data: any) => {
    console.log("Recieved id: " + data)
    const supabase = createClient();
            
    const { data: reviewData, error: reviewErr } = await supabase
        .from('reviews')
        .select("user_name, review_text, rating")
        .eq('destination_id', data)


    console.log("Review Data: " + JSON.stringify(reviewData))
    return reviewData;
}
export default getReviews;