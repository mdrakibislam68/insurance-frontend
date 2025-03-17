import React, { JSX, useEffect, useState } from 'react'
import CommonDrawer from '@/components/UI/commonDrawer'
import { Avatar, Badge, Button, Flex, Select, Tag, Typography } from 'antd'
import { COLORS } from '@/lib/colors'
import { Title } from '@/components/UI/typography'
import { usersApi } from '@/services/users/users-api'
import PermissionCard from '@/components/views/roles-and-permissions/elements/permissionCard'
import usePermissionStore from '@/store/permissionStore'
import { permissionsApi } from '@/services/permissions/permissions-api'
import useUserStore from '@/store/userStore'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { errorHandler } from '@/lib/error'

interface PropsType {
    open: boolean
    onClose: () => void
    data: any
}

interface RoleOptionsDataType {
    id: number
    value: string
    label: string
}

interface RoleFormTypes {
    email: string
    role: string
}

const EditStaffDrawer = ({ open, onClose, data }: PropsType) => {
    const [roleOptions, setRoleOptions] = useState<RoleOptionsDataType[]>([])
    const { permissionsList } = usePermissionStore()
    const [permissionIds, setPermissionIds] = React.useState<any[]>([])
    const { roleData } = useUserStore()
    const form = useForm<RoleFormTypes>()
    const {
        reset,
        handleSubmit,
        control,

        formState: { errors, isSubmitting, defaultValues },
    } = form

    useEffect(() => {
        usersApi.getRoleOptions().then((res) => {
            setRoleOptions(res)
        })
    }, [])

    useEffect(() => {
        if (data?.email) {
            reset({ email: data.email, role: roleData?.id })
            permissionsApi.getUserPermissionsList(data.email).then((data) => {
                setPermissionIds(data.permissions)
            })
        }
    }, [data?.email, reset])

    const updateHandler = async (data: any) => {
        try {
            const response = await permissionsApi.updateUserPermissions({
                ...data,
                permissions: permissionIds,
            })
            toast.success(response.message)
            onClose()
            await usersApi.getRoleUsers(roleData?.id)
            await usersApi.getRoles()
        } catch (error) {
            errorHandler({ error })
        }
    }

    const deleteHandler = async () => {
        try {
            const response = await usersApi.deleteUser({ email: data?.email })
            toast.success(response.message)
            onClose()
            await usersApi.getRoleUsers(roleData?.id)
            await usersApi.getRoles()
        } catch (error) {
            errorHandler({ error })
        }
    }

    const footer: JSX.Element = (
        <Flex justify={'space-between'} align={'center'} gap={16}>
            <Button block shape={'round'} onClick={deleteHandler}>
                Delete User
            </Button>
            <Button
                block
                shape={'round'}
                type="primary"
                htmlType="submit"
                style={{ background: COLORS.colorNeutral950, color: 'white' }}
                onClick={handleSubmit(updateHandler)}
            >
                Save Changes
            </Button>
        </Flex>
    )

    const handleChange = (value: string) => {
        console.log(`selected ${value}`)
    }

    return (
        <CommonDrawer
            headerTitle={'Edit Staff'}
            onClose={onClose}
            open={open}
            footer={footer}
        >
            <Flex vertical gap={24}>
                <Flex justify={'space-between'} align={'center'}>
                    <Flex gap={16} justify={'center'}>
                        <Avatar
                            size={60}
                            src={'https://shorturl.at/zBbtr'}
                            alt="avatar"
                        />
                        <Flex vertical gap={4}>
                            <Title
                                level={4}
                            >{`${data?.first_name} ${data?.last_name}`}</Title>
                            <Typography style={{ fontSize: 14 }}>
                                {data?.email}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Tag
                        color={data?.is_active ? '#F2F8F2' : 'red'}
                        style={{
                            borderRadius: 100,
                            borderColor: data?.is_active
                                ? '#55A253'
                                : '#FF0000',
                            color: data?.is_active ? '#55A253' : '#FF0000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 500,
                            gap: 4,
                            width: 66,
                        }}
                    >
                        <Badge color={data?.is_active ? '#55A253' : 'red'} />
                        {data?.is_active ? 'Active' : 'Inactive'}
                    </Tag>
                </Flex>
                <form>
                    <Flex
                        vertical
                        gap={24}
                        style={{
                            padding: 24,
                            paddingTop: 20,
                            borderRadius: 12,
                            border: `1px solid ${COLORS.colorNeutral50}`,
                        }}
                    >
                        <Title level={4}>Selected Role</Title>
                        <Flex vertical gap={12}>
                            <Typography style={{ fontSize: 14 }}>
                                Role
                            </Typography>
                            <Controller
                                name={'role'}
                                control={control}
                                render={({ field }) => (
                                    <Select {...field} options={roleOptions} />
                                )}
                            />
                        </Flex>
                    </Flex>

                    <Flex
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 24,
                            marginTop: 24,
                        }}
                    >
                        {permissionsList.data.map((item, index) => (
                            <PermissionCard
                                key={index}
                                permissionIds={permissionIds}
                                setPermissionIds={setPermissionIds}
                                title={item.name}
                                item={item}
                            />
                        ))}
                    </Flex>
                </form>
            </Flex>
        </CommonDrawer>
    )
}

export default EditStaffDrawer
