// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const subdomain = "test"
  // const subdomain = host.replace('.helius.shop', '')

  const url = req.nextUrl.clone()
  url.pathname = `/store/${subdomain}${url.pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
}