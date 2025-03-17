import React, { ReactNode } from 'react'
import Header from '@/components/header/header'
import { COLORS } from '@/lib/colors'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className={`h-full w-full p-8`}
            style={{ backgroundColor: COLORS.colorPrimary50 }}
        >
            <Header />
            {children}
        </div>
    )
}
export default AuthLayout
