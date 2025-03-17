'use client'
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

interface props {
    children: ReactNode
    session: Session | null
}

export function Providers({ children, session }: props) {
    return <SessionProvider session={session}>{children}</SessionProvider>
}
