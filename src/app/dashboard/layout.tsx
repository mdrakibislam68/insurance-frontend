import DashboardLayout from '@/components/layouts/dashboard/dashboardLayout'
import React from 'react'

const DashboardLayoutMain = ({ children }: { children: React.ReactNode }) => {
    return <DashboardLayout>{children}</DashboardLayout>
}

export default DashboardLayoutMain
