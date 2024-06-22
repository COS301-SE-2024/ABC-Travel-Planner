// "use server";
// import createSupabaseServerClient from '@/libs/supabase/server';
// import { Loader } from "@googlemaps/js-api-loader";

// export const handleSearchAirports = async (destination: any) => {
//     const supabase = await createSupabaseServerClient();
//         const { data: { user } } = await supabase.auth.getUser();

//         let { data: Airports, error } = await supabase.from('Airports').select('*').ilike('country_name', `%${destination}%`);
//         console.log("SEARCH TERM " + destination);
// };

