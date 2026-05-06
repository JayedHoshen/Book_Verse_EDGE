import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("auth-storage")?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/dashboard", "/profile"];
  const authPaths = ["/login", "/register", "/forgot-password"];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPath && token) {
    try {
      const authData = JSON.parse(token);
      const user = authData?.state?.user;

      if (user) {
        const dashboardUrl = user.role === "admin" ? "/admin" : "/user";
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
    } catch (error) {
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*",
    "/profile/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
