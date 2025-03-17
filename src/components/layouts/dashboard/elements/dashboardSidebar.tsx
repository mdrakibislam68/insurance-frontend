import { Menu, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import { menuConfig } from '@/config/menu-config'
import React from 'react'
import { useSession } from 'next-auth/react'
import { hasPermission } from '@/utils/permissions'
import { HugeiconsIcon } from '@hugeicons/react'
import './dashboardSidebar.scss'

type MenuItem = Required<MenuProps>['items'][number]

const DashboardSidebar = () => {
    const router = useRouter()
    const { data } = useSession()

    const onClick: MenuProps['onClick'] = (e) => {
        router.push(`/${e.key}`)
    }

    // @ts-ignore
    const items: MenuItem[] = menuConfig.dashboardMenu
        .map((el) => {
            const filteredChildren = el.children?.filter((child) =>
                hasPermission(
                    data?.user.permissions,
                    child.permissions || [],
                    data?.user.is_superuser,
                ),
            )

            // if (!filteredChildren || filteredChildren.length === 0) return null

            return {
                key: el.key,
                label: el.label,
                type: el.type,
                children: filteredChildren?.map((child) => ({
                    key: child.key,
                    label: child.label,
                    icon: child.icon ? (
                        <HugeiconsIcon
                            icon={child.icon}
                            size={24}
                            color="currentColor"
                            strokeWidth={0}
                        />
                    ) : null,
                })),
            }
        })
        .filter(Boolean)

    return (
        <>
            <Menu
                className={'dashboard-sidebar'}
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </>
    )
}
export default DashboardSidebar
