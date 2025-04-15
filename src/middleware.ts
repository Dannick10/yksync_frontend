import { NextResponse, type MiddlewareConfig, type NextRequest} from "next/server";

const publicRoutes = [
  {path: '/signin', whenAuthenticated: 'redirect'},
  {path: '/register', whenAuthenticated: 'redirect'},
  {path: '/sobre', whenAuthenticated: 'next'},
  {path: '/servicos', whenAuthenticated: 'next'},
  {path: '/contato', whenAuthenticated: 'next'},
  {path: '/recursos', whenAuthenticated: 'next'},
  {path: '/termos', whenAuthenticated: 'next'},
  {path: '/politica', whenAuthenticated: 'next'},
  {path: '/', whenAuthenticated: 'redirect'},
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/signin'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authToken = request.cookies.get('token')

    if(!authToken && publicRoute) {
        return NextResponse.next()
    }

    if(!authToken && !publicRoute) {
      const redirectUrl = request.nextUrl.clone()

      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

      return NextResponse.redirect(redirectUrl)
    }

    if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = '/dashboard'

      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)',
  ],
  }