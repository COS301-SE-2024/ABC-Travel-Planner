import { NextApiRequest, NextApiResponse } from 'next';
// import createSupabaseServerClient from '../../libs/supabase/server';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const details = req.body;
    console.log("INSERTION - REAAAACCHHHEEEED DATABASE");

    try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
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
        console.error("Insert Error:", insertErr);
        res.status(500).json({ error: insertErr });
      } else {
        console.log("Data:\n\n", insertData);
        res.status(200).json(insertData);
      }
    } catch (error) {
      console.error("Error creating Supabase client:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}