import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const details = req.body;
    try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        console.log("Database ID: " + id)
        
        const { data: ItineraryItemsData, error: ItineraryItemsErr } = await supabase
            .from('Itinerary-Items')
            .delete()
            .eq('id', id)

      if (ItineraryItemsErr) {
        console.error("Delete Error:", ItineraryItemsErr);
        res.status(500).json({ error: ItineraryItemsErr });
      } else {
        console.log("Data:\n\n", ItineraryItemsData);
        res.status(200).json(ItineraryItemsData);
      }
    } catch (error) {
      console.error("Error creating Supabase client:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}