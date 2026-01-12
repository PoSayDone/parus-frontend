import { type NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for sign-in page and API routes
  if (pathname.startsWith('/admin/sign-in') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Check if the route is an admin route
  if (pathname.startsWith('/admin')) {
    // Get session
    const session = await getIronSession<{ user?: { id: string; role: string } }>(
      request,
      NextResponse.next(),
      sessionOptions,
    );

    // If no user in session, redirect to sign-in
    if (!session.user) {
      return NextResponse.redirect(new URL('/admin/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
};
