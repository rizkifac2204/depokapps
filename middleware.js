import { NextResponse } from "next/server";

export const config = {
  matcher: ["/(admin.*)", "/auth"],
};

export default function middleware(req, res) {
  const { pathname, origin } = req.nextUrl;
  const depokApps = req.cookies.get("depokApps");

  if (pathname.startsWith("/auth")) {
    if (depokApps) return NextResponse.redirect(`${origin}/admin`);
  }
  if (pathname.startsWith("/admin")) {
    if (!depokApps) return NextResponse.redirect(`${origin}/auth`);
  }

  return NextResponse.next();
}
