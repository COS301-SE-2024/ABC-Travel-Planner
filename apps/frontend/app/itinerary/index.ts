"use server";
import createSupabaseServerClient from "@/libs/supabase/server";

const createItinerary = async (itineraryName: string, location: string) => {
  const supabase = await createSupabaseServerClient();
  const image = await getItineraryImage(location);
  const { data, error } = await supabase
    .from("Itinerary")
    .insert([{ name: itineraryName, location: location, image: image }])
    .select();
  if (error) {
    console.error("error", error);
  }
  return data;
};

const getItineraryImage = async (location: string) => {
  const supabase = await createSupabaseServerClient();
  const { data: list, error } = await supabase.storage.from("locations").list();
  if (error) {
    console.error("error", error);
  } else {
    const filteredObjects = list.filter(object =>
      object.name.includes(location)
    );
    if (filteredObjects.length == 0) {
      return "https://rgfpdfcxkoepvqtmtxir.supabase.co/storage/v1/object/public/locations/Default1.jpg";
    } else {
      const { data } = supabase.storage
        .from("locations")
        .getPublicUrl(`${location}.jpg`);
      return data.publicUrl;
    }
  }
};

const getItineraries = async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from("Itinerary").select();
  if (error) {
    console.error("error", error);
  }
  return data;
};

const updateItinerary = async (
  id: any,
  itineraryName: string,
  location: string
) => {
  const supabase = await createSupabaseServerClient();
  const image = await getItineraryImage(location);
  const { data, error } = await supabase
    .from("Itinerary")
    .update([{ name: itineraryName, location: location, image: image }])
    .eq("id", id)
    .select();
  if (error) {
    console.error("error", error);
  }
  return data;
};

const deleteItinerary = async (id: any) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("Itinerary")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    console.error("error", error);
  }
  return data;
};

export { createItinerary, getItineraries, updateItinerary, deleteItinerary };
