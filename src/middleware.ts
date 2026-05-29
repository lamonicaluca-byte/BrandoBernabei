import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['it', 'en', 'fr']
const defaultLocale = 'it'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) return
  const hasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
  if (!hasLocale) {
    const acceptLang = request.headers.get('accept-language') ?? ''
    const preferred = locales.find(l => acceptLang.toLowerCase().includes(l)) ?? defaultLocale
    return NextResponse.redirect(new URL(`/${preferred}${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
}
