// middleware.ts (ở root project)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    // Các route công khai không cần kiểm tra
    const publicRoutes = ['/', '/login', '/register', '/about']
    const isPublicRoute = publicRoutes.includes(pathname)

    // Nếu là route công khai, cho phép truy cập
    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Kiểm tra có token không
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        // Verify JWT token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret)

        const userRole = payload.role as string

        // Phân quyền admin
        if (pathname.startsWith('/admin')) {
            if (userRole !== 'admin') {
                return NextResponse.redirect(new URL('/unauthorized', request.url))
            }
        }

        // Phân quyền user
        if (pathname.startsWith('/dashboard')) {
            if (!['admin', 'user'].includes(userRole)) {
                return NextResponse.redirect(new URL('/unauthorized', request.url))
            }
        }

        // Nếu đã login, không cho vào trang login
        if (pathname === '/login' || pathname === '/register') {
            const redirectUrl = userRole === 'admin' ? '/admin' : '/dashboard'
            return NextResponse.redirect(new URL(redirectUrl, request.url))
        }

        return NextResponse.next()

    } catch (error) {
        // Token không hợp lệ
        console.error('Token verification failed:', error)
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
}