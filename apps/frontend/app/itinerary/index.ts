"use server";
import createSupabaseServerClient from "@/libs/supabase/server";
import readUser from "@/libs/actions";

const createItinerary = async (itineraryName: string, city: string) => {
  const supabase = await createSupabaseServerClient();
  const image = await getItineraryImage(city);
  const { data, error } = await supabase
    .from("Itinerary")
    .insert([{ name: itineraryName, location: city,image: image}])
    .select();
  if (error) {
    console.error("error", error);
  }
  return data;
};

const getItineraryImage = async (City: string) => {
  const supabase = await createSupabaseServerClient();
  const { data } = supabase.storage
    .from("locations")
    .getPublicUrl(`${City}.jpg`);
  return data.publicUrl;
};

const getItineraries = async () => {
    const supabase = await createSupabaseServerClient();
    const user = await readUser();
    console.log("user", user);

    const { data, error } = await supabase.from("Itinerary").select();
    if (error) {
        console.error("error", error);
    }
    console.log(data);
    return data;
}

export { createItinerary, getItineraries };