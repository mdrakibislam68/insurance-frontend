import RolesAndPermissionHeader from '@/components/views/roles-and-permissions/elements/rolesAndPermissionHeader'
import RolesTable from '@/components/tables/rolesTable'
import { Badge, Button, Flex, Image, Tag, Typography } from 'antd'
import React, { useState } from 'react'
import EditStaffDrawer from '@/components/views/roles-and-permissions/elements/editStaffDrawer'
import UserAvatar from '@/assets/images/user.png'
import moment from 'moment'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { COLORS } from '@/lib/colors'
import userStore from '@/store/userStore'

const { Text } = Typography

const RolesPermissionsTabData = () => {
    const { roles, roleUsers, setRoleData, roleData } = userStore()

    const [userData, setUserData] = useState(null)
    const [open, setOpen] = useState<boolean>(false)

    const columns = [
        {
            title: '#',
            dataIndex: '',
            key: 'id',
            render: (text: any, record: any, idx: any) => <>{idx + 1}</>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any, idx: any) => (
                <>
                    <Flex align={'center'} gap={12}>
                        <Image
                            src={UserAvatar.src}
                            alt="user"
                            width={40}
                            height={40}
                        />
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>
                            {record.first_name} {record.last_name}
                        </Text>
                    </Flex>
                </>
            ),
        },
        {
            title: 'Email ADDRESS',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: any, record: any, idx: any) => (
                <>
                    <Tag
                        color={record.is_active ? '#F2F8F2' : 'red'}
                        style={{
                            borderRadius: 100,
                            borderColor:
                                record.is_active ? '#55A253' : '#FF0000',
                            color:
                                record.is_active ? '#55A253' : '#FF0000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 500,
                            gap: 4,
                            width: 66,
                        }}
                    >
                        <Badge
                            color={record.is_active ? '#55A253' : 'red'}
                        />
                        {record.is_active ? 'Active' : 'Inactive'}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Last Login',
            dataIndex: 'last_login',
            key: 'last_login',
            render: (text: any, record: any, idx: any) => (
                <>
                    {record.last_login ? moment(record.last_login).local().format('MMM DD, YYYY') : '-'}
                </>
            ),
        },
        {
            title: 'ACTION',
            dataIndex: '',
            key: 'action',
            render: (text: any, record: any, idx: any) => (
                <>
                    {!roleData?.is_superuser && roleData?.name !== 'Super Admin' && roleData?.name !== 'Admin' && (
                        <Button
                            type="link"
                            icon={
                                <HugeiconsIcon
                                    icon={ArrowRight01Icon}
                                    color={COLORS.colorPrimaryBase}
                                    height={18}
                                    width={18}
                                    style={{ marginTop: 3 }}
                                />
                            }
                            iconPosition={'end'}
                            style={{ alignItems: 'center', fontSize: 14, height: 22, padding: 0 }}
                            onClick={() => showDrawer(record)}
                        >
                            View
                        </Button>
                    )}
                </>
            ),
        },
    ]

    const showDrawer = (record: any) => {
        setOpen(true)
        setUserData({ ...record })
    }

    const onClose: () => void = () => {
        setOpen(false)
        setUserData(null)
    }

    return (
        <>
            <Flex vertical style={{ width: '100%', paddingLeft: 32 }}>
                {roleData && <RolesAndPermissionHeader />}
                {/* @ts-ignore */}
                <RolesTable data={roleUsers.data?.users || []} loading={roleUsers.loading} columns={columns} />
            </Flex>
            <EditStaffDrawer open={open} onClose={onClose} data={userData} />
        </>
    )
}
export default RolesPermissionsTabData
