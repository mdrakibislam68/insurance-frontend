'use client'
import React, { ReactNode, useState } from 'react'
import { Button, Divider, Flex, Layout } from 'antd'

import Image from 'next/image'
import DashboardSidebar from '@/components/layouts/dashboard/elements/dashboardSidebar'
import { COLORS } from '@/lib/colors'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeftDoubleIcon } from '@hugeicons/core-free-icons'
import { signOut } from 'next-auth/react'

const { Header, Sider, Content } = Layout

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout
            style={{
                padding: 16,
                backgroundColor: COLORS.colorPrimary50,
                height: '100vh',
                gap: 16,
            }}
        >
            <Sider
                theme={'light'}
                trigger={null}
                width={270}
                collapsible
                collapsed={collapsed}
                style={{ borderRadius: 12, padding: 16 }}
            >
                <Flex gap={16} justify="center">
                    {!collapsed && (
                        <Image
                            src={'/logo.svg'}
                            alt={'logo'}
                            height={42}
                            width={186}
                            priority
                        />
                    )}
                    <Flex
                        style={{
                            width: 36,
                            height: 36,
                            padding: 10,
                            borderRadius: 8,
                            border: `1px solid ${COLORS.colorNeutral50}`,
                            cursor: 'pointer',
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <HugeiconsIcon
                            icon={ArrowLeftDoubleIcon}
                            height={16}
                            width={16}
                            style={{ fontWeight: 800 }}
                        />
                    </Flex>
                </Flex>
                <Divider />
                <DashboardSidebar />
            </Sider>
            <Layout style={{ gap: 16, backgroundColor: 'transparent' }}>
                <Header style={{ borderRadius: 12, background: '#FFFFFF' }}>
                    <Flex gap={10} align={'center'} justify={'center'}>
                        <Flex justify="center">this is header</Flex>
                        <Button danger onClick={() => signOut()}>Logout</Button>
                    </Flex>
                </Header>
                <Content
                    style={{
                        borderRadius: 12,
                        backgroundColor: 'white',
                        padding: 32,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashboardLayout
