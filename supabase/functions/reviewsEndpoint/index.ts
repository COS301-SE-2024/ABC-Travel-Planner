// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// / <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
// import { createClient } from 'https://esm.sh/@supabase/supabase-js';
// import { corsHeaders } from '../../../apps/frontend/app/services/_shared/cors';
// import { Response } from 'https://esm.sh/v135/@supabase/node-fetch@2.6.15/denonext/node-fetch.mjs';

// console.log("Hello from Functions!")

// Deno.serve(handleRequest);

// async function handleRequest(req) {
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders })
//   }

//   const body = await req.json()
  
//   if (body.request == "addReview") {
//     return await (addReview(body))
//   }
//   else {
//     return new Response(JSON.stringify(JSON.parse('{"status" : "failed","timestamp" : ' + Date.now() + ',"body" : {"message" : "Request field value not accepted"}}')), { status: 400 });
//   }
//   // {
//   //   request: "addReview",
//   //   user: "userID",
//   //   userName: "verycooluser",
//   //   rating: 4,
//   //   review: ["I mean it wasn't the best but it was pretty close"]
//   // }
// }

// async function addReview(body) {
//   console.log("It works :)")
// }

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/reviewsEndpoint' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
