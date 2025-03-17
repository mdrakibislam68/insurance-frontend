import { DefaultJWT } from 'next-auth/jwt'
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: number
        first_name: string
        last_name: string
        email: string
        role: string
        is_staff: boolean
        is_superuser: boolean
        permissions: string[]
    }

    interface Session {
        user: User & {
            // Extend User to include tokens
            refresh?: string
            access?: string
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: {
            refresh?: string
            access?: string
            user?: {
                id: number
                first_name: string
                last_name: string
                email: string
                role: string
                is_staff: boolean
                is_superuser: boolean
                permissions: string[]
            }
        }
    }
}
