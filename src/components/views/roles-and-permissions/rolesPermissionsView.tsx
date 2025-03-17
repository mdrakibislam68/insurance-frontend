'use client'
import { Badge, Button, Divider, Flex, Typography } from 'antd'
import userStore from '@/store/userStore'
import React, { useEffect, useMemo, useState } from 'react'
import { usersApi } from '@/services/users/users-api'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { COLORS } from '@/lib/colors'
import { permissionsApi } from '@/services/permissions/permissions-api'
import RolesPermissionsTabData from '@/components/views/roles-and-permissions/elements/rolesPermissionsTabData'
import CreateCustomRoleDrawer from '@/components/views/roles-and-permissions/elements/createCustomRoleDrawer'

const { Text } = Typography

const RolesAndPermissionsView = () => {
    const { roles, setRoleData } = userStore()
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState(null)
    const [open, setOpen] = useState<boolean>(false)

    const tabClickHandler = async (role: any) => {
        setActiveTab(role.id)
        setRoleData(role)
        await usersApi.getRoleUsers(role.id)
    }

    const groupedRoles = useMemo(
        () => ({
            default: roles.filter((role) => role.is_default),
            custom: roles.filter((role) => !role.is_default),
        }),
        [roles],
    )

    useEffect(() => {
        setLoading(true)
        usersApi
            .getRoles()
            .then((fetchedRoles) => {
                if (fetchedRoles?.length > 0) {
                    const defaultRole = fetchedRoles.find(
                        (role: any) => role.is_default,
                    )
                    if (defaultRole) {
                        return tabClickHandler(defaultRole)
                    }
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        permissionsApi.getPermissionsList().catch((error) => {
            console.log(error)
        })
    }, [])

    const showDrawer = (record: any) => {
        setOpen(true)
    }

    const onClose: () => void = () => {
        setOpen(false)
    }

    return (
        <>
            <Flex className="w-full">
                <Flex vertical style={styles.leftSide}>
                    <Text style={styles.groupText}>DEFAULT ROLES</Text>
                    {groupedRoles.default.map((role) => (
                        <Flex
                            key={role.id}
                            style={{
                                ...styles.roleItem,
                                backgroundColor:
                                    activeTab === role.id
                                        ? COLORS.colorPrimary50
                                        : 'transparent',
                                color:
                                    activeTab === role.id
                                        ? COLORS.colorPrimary600
                                        : COLORS.colorNeutral500,
                            }}
                            onClick={() => tabClickHandler(role)}
                        >
                            {role.name}
                            <Badge
                                count={role.users_count}
                                style={{
                                    backgroundColor:
                                        activeTab === role.id
                                            ? COLORS.colorPrimary400
                                            : COLORS.colorPrimary100,
                                    ...styles.badge,
                                }}
                            />
                        </Flex>
                    ))}

                    <Divider style={{ margin: '24px 0' }} />

                    {groupedRoles.custom.length > 0 && (
                        <Flex vertical>
                            <Text style={styles.groupText}>CUSTOM ROLES</Text>
                            {groupedRoles.custom.map((role) => (
                                <Flex
                                    key={role.id}
                                    style={{
                                        ...styles.roleItem,
                                        backgroundColor:
                                            activeTab === role.id
                                                ? COLORS.colorPrimary50
                                                : 'transparent',
                                        color:
                                            activeTab === role.id
                                                ? COLORS.colorPrimary600
                                                : COLORS.colorNeutral500,
                                    }}
                                    onClick={() => tabClickHandler(role)}
                                >
                                    {role.name}
                                    <Badge
                                        count={role.users_count}
                                        style={{
                                            ...styles.badge,
                                            backgroundColor:
                                                activeTab === role.id
                                                    ? COLORS.colorPrimary400
                                                    : COLORS.colorPrimary100,
                                            color: COLORS.colorNeutral950,
                                        }}
                                    />
                                </Flex>
                            ))}

                            <Divider style={{ margin: '24px 0' }} />
                        </Flex>
                    )}

                    <Button
                        type={'primary'}
                        variant={'outlined'}
                        shape={'round'}
                        onClick={showDrawer}
                        icon={
                            <HugeiconsIcon
                                icon={PlusSignIcon}
                                width={16}
                                height={16}
                            />
                        }
                    >
                        Create Custom Role
                    </Button>
                </Flex>
                <CreateCustomRoleDrawer
                    open={open}
                    onClose={onClose}
                    data={'nulldata'}
                />
                <RolesPermissionsTabData />
            </Flex>
        </>
    )
}
export default RolesAndPermissionsView

const styles = {
    leftSide: {
        width: 270,
        paddingRight: 32,
        borderRightColor: COLORS.colorNeutral50,
        borderRightWidth: 1,
        borderRightStyle: 'solid' as const,
    },
    groupText: {
        fontSize: 12,
        fontWeight: 500,
        color: COLORS.colorNeutral500,
        marginBottom: 12,
        marginLeft: 12,
    },
    roleItem: {
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'all 0.2s',
        marginBottom: 4,
        fontSize: 16,
        fontWeight: 600,
    },
    badge: {
        color: COLORS.colorNeutral950,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
}
