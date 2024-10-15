"use server"
import createSupabaseServerClient from '../../libs/supabase/server';

export const DatabaseUpload = async(details: any) => {
    const supabase = await createSupabaseServerClient();
    const formattedDate = new Date().toISOString();
    const id = details.id
    const location = details.location
    const itemTitle = details.Item_Title
    const itemType = details.Item_Type
    const destination = details.destination
    const image_url = details.image_url

    const { data: insertData, error: insertErr } = await supabase
        .from('Itinerary-Items')
        .insert([{
            created_at: formattedDate,
            Item_Name: itemTitle,
            Item_Type: itemType,
            Location: destination,
            Itinerary_ID: id,
            Destination: location,
            image_link: image_url
        }])
        .select()
  
    if (insertErr) {
        console.log("ERR: " + JSON.stringify(insertErr))
    } else if (insertData) {
        console.log("Data:\n\n" + JSON.stringify(insertData))
    } else {
        console.log("ERR & DATA is null")
    }

}