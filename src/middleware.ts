import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PROTECTED_ROUTES } from '@/config/permissions'

export const config = {
    matcher: ['/', '/dashboard/:path*', '/auth/:path*'],
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = await getToken({ req: request, secret: process.env.JWT_SECRET })

    const isAuthenticated = !!token
    const userInfo = token?.user?.user
    const userRole = userInfo?.role || ''
    const userPermissions = userInfo?.permissions || []
    const isSuperUser = userInfo?.is_superuser || userRole === 'Super Admin' || userRole === 'Admin'

    // Handle unauthenticated users
    if (!isAuthenticated) {
        if (pathname === '/') return NextResponse.redirect(new URL('/auth/login', request.url))
        if (pathname.startsWith('/dashboard')) return NextResponse.redirect(new URL('/auth/login', request.url))
        return NextResponse.next() // Allow access to `/auth/*`
    }

    // Handle authenticated users
    if (pathname === '/') return NextResponse.redirect(new URL('/dashboard', request.url))
    if (pathname.startsWith('/auth')) return NextResponse.redirect(new URL('/dashboard', request.url))

    // Handle dashboard access control
    if (pathname.startsWith('/dashboard')) {
        if (isSuperUser) return NextResponse.next()

        const requiredPermissions = PROTECTED_ROUTES[pathname] || []
        const hasPermission = requiredPermissions.some(permission => userPermissions.includes(permission))

        if (!hasPermission && pathname !== '/dashboard') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}
