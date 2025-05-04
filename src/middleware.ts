// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const subdomain = "teste"
  // const subdomain = host.replace('.helius.shop', '')

  const url = req.nextUrl.clone()
  url.pathname = `/store/${subdomain}${url.pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|assets|api|.*\\..*).*)'],
}
