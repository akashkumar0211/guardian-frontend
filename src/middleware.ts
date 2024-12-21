import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const url = request.nextUrl.clone();
  const baseUrl = request.nextUrl.origin;

  if (!session) {
    if (request.nextUrl.pathname !== "/signin") {
      url.pathname = "/signin";
      url.searchParams.set("redirect", `${baseUrl}${request.nextUrl.pathname}${request.nextUrl.search}`);
      return NextResponse.redirect(url);
    }
  } else {
    if (request.nextUrl.pathname === "/signin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png).*)/'],
};
