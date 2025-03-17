import React from 'react'
import { COLORS } from '@/lib/colors'
import { Flex, Switch, Typography } from 'antd'
import { Title } from '@/components/UI/typography'

interface PropsTypes {
    title: string
    item: Record<string, any>
    permissionIds: any
    setPermissionIds: any
}

const PermissionCard = ({ title, item, permissionIds, setPermissionIds }: PropsTypes) => {
    const handleSwitchChange = (id: any) => {
        setPermissionIds((prevPermissionIds: any) => {
            if (prevPermissionIds.includes(id)) {
                return prevPermissionIds.filter((itemId: any) => itemId !== id)
            } else {
                return [...prevPermissionIds, id]
            }
        })
    }


    return (
        <Flex
            vertical
            gap={20}
            style={{
                padding: 24,
                paddingTop: 20,
                width: 236,
                borderRadius: 12,
                border: `1px solid ${COLORS.colorNeutral50}`,
            }}
        >
            <Title level={4} style={{ fontWeight: 500 }}>
                {title}
            </Title>

            <Flex vertical gap={16}>
                {item.actions.map((permission: any) => {
                    const permissionKey = permission.action_name.split('_')[1]
                    return (
                        <Flex justify="space-between" key={permission.id}>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                }}
                            >
                                {permissionKey}
                            </Typography>
                            <Switch
                                checked={permissionIds?.includes(permission.id)}
                                onChange={() =>
                                    handleSwitchChange(permission.id)
                                }
                            />
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}

export default PermissionCard
