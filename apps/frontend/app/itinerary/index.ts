"use server";
import createSupabaseServerClient from "@/libs/supabase/server";
import { getStorage,ref,getDownloadURL } from "firebase/storage";
import app from "@/libs/firebase/firebase";


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
  const storage = getStorage(app);
  const imageRef = ref(storage, `locations/${location.toLowerCase()}.jpg`);
  try{
    const url = await getDownloadURL(imageRef);
    return url;
  }catch(e){
    const url = await getDownloadURL(ref(storage, `locations/Default1.jpg`));
    return url;
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

export { createItinerary, getItineraries, updateItinerary, deleteItinerary, getItineraryImage };
