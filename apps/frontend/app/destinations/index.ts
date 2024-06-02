"use server";
import createSupabaseServerClient from '@/libs/supabase/server';

export const handleFavoriteClick = async (destination: any) => {
    
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    let { data: favourite_destinations, error: selectError } = await supabase.from('favourite_destinations').select('destination_object').single()
    if (favourite_destinations && favourite_destinations.destination_object) {
        const { data, error } = await supabase.from('favourite_destinations').update({ status: true }).eq('user_id', `${user?.id}`).eq('location_id', destination.location_id).select()

    }else{
        const { data, error } = await supabase.from('favourite_destinations').insert([
            { user_id: `${user?.id}`, destination_object: destination, location_id: destination.location_id, status: true },
        ]).select()
    }
    // // const curruser = await getCurrentUser();
    // // console.log("This is the one we get from the user " + JSON.stringify(curruser));
    // const { data, error } = await supabase.from('favourite_destinations').insert([
    //     { user_id: `${user?.id}`, destination_object: destination, location_id: destination.location_id, status: true },
    // ])
    //     .select()

};

export const handleUnFavoriteClick = async (destination: any) => {
    
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('favourite_destinations').update({ status: false }).eq('location_id', `${destination.location_id}`).eq('user_id', `${user?.id}`);
};