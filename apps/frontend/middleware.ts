import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";



export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  
  const cookies = request.cookies;
  const userId = cookies.get("user_id");
  // console.log("user_id", userId);
  // const user = cookies.get("user");
  // console.log("user", user);

 ///need to check if user is logged in or not

  if (!userId && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/signup") {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    console.log("url", loginUrl.toString());
    return NextResponse.redirect(loginUrl);
  } else if (
    userId &&
    (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/")
  ) {
    const homeUrl = new URL("/home", request.nextUrl.origin);
    console.log("url", homeUrl.toString());
    return NextResponse.redirect(homeUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|Images|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
