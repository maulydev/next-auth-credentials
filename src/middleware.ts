import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";

const PROTECTED_ROUTES = ["/admin", "/agent", "/customer", "/"];

export async function middleware(request: NextRequest) {
  const session: any = await auth();
  const response = NextResponse.next();

  if (session?.user) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(
        new URL(`/${session.user.role}`, request.url)
      );
    } else if (request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(
        new URL(`/${session.user.role}`, request.url)
      );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `Bearer ${session.access}`);
    response.headers.set("Authorization", `Bearer ${session.access}`);
    
  } else {
    if (PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [...PROTECTED_ROUTES],
};
