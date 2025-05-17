import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = await getToken({ req: request })

    if (!token) {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }
  }

  // Protect solution pages
  if (pathname.startsWith("/solution/")) {
    // Here you would check if the user has paid for this solution
    // For simplicity, we're not implementing this check in the middleware
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/solution/:path*"],
}
