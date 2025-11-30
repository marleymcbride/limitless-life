import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirect any URL starting with /black-friday-offer-1 to the Google Doc
  if (request.nextUrl.pathname.startsWith('/black-friday-offer-1')) {
    const url = 'https://docs.google.com/document/d/1uPK8DhdAnYUmcbjASPcJXj6GcO-QT-RETUePdP3Zf3c/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/black-friday-offer-1/:path*'
}