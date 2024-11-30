import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  // Disable caching by adding cache-control headers
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
