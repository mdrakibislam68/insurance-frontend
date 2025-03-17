import type { NextAuthOptions, Session } from 'next-auth'
import { getServerSession } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from 'next'
import { permissionsApi } from '@/services/permissions/permissions-api'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                isManual: { type: 'boolean' },
                data: { label: 'Data', type: 'text' },
            },
            async authorize(credentials) {
                if (credentials?.isManual) {
                    return JSON.parse(credentials.data)
                }
                try {
                    const { data }: any = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
                        credentials
                    )
                    return data
                } catch (error: any) {
                    if ('response' in error) {
                        const { data: errors } = error.response
                        const fieldsErrors: any = []

                        Object.entries(errors).forEach((entry) => {
                            const [key, value] = entry
                            fieldsErrors.push({
                                name: key,
                                errors: value,
                            })
                        })
                        throw new Error(JSON.stringify(fieldsErrors))
                    }
                }
            },
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID || '',
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        // }),
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/login',
    },
    session: { maxAge: 7 * 24 * 60 * 60 },
    callbacks: {
        async jwt({ token, user, account }) {
            if (
                account?.provider === 'google' ||
                account?.provider === 'facebook'
            ) {
                const { access_token, id_token } = account

                let socialAuthUrl = ''

                if (account?.provider === 'google') {
                    socialAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth-social-login/google/`
                } else if (account?.provider === 'facebook') {
                    socialAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth-social-login/facebook/`
                }

                const { data } = await axios.post(socialAuthUrl, {
                    access_token: access_token,
                    id_token: id_token,
                })

                const user = {
                    access: data.access,
                    refresh: data.refresh,
                    user: {
                        ...data,
                    },
                }
                token = { ...user }
                return token
            } else {
                if (user) {
                    // @ts-ignore
                    token.user = user
                    return { ...token }
                }
            }
            return token
        },
        session: async ({
            session,
            token,
        }: {
            token: JWT
            session: Session
        }) => {
            if (token) {
                session.user = {
                    ...session.user,
                    access: token.user.access,
                    refresh: token.user.refresh,
                    ...token.user.user,
                }

                if (session.user?.access) {
                    const data = await permissionsApi.getPermissions(
                        session.user.access
                    )
                    session.user.permissions = data.permissions
                    session.user.role = data.role
                }
            }
            return session
        },
    },
    secret: process.env.JWT_SECRET,
}

export function auth(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions)
}
