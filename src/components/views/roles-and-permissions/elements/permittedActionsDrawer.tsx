import React, { JSX, useEffect } from 'react'
import { Button, Flex } from 'antd'
import { COLORS } from '@/lib/colors'
import CommonDrawer from '@/components/UI/commonDrawer'
import usePermissionStore from '@/store/permissionStore'
import { useForm } from 'react-hook-form'
import userStore from '@/store/userStore'
import { usersApi } from '@/services/users/users-api'
import { errorHandler } from '@/lib/error'
import { toast } from 'react-toastify'
import PermissionCard from '@/components/views/roles-and-permissions/elements/permissionCard'

interface PropsTypes {
    open: boolean
    onClose: () => void
}

interface RoleFormTypes {
    name: string
}

const PermittedActionsDrawer = ({ open, onClose }: PropsTypes) => {
    const { permissionsList } = usePermissionStore()
    const { roleData } = userStore()

    const form = useForm<RoleFormTypes>()

    const [permissionIds, setPermissionIds] = React.useState<any[]>([])
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = form

    useEffect(() => {
        reset({ name: roleData?.name })
        setPermissionIds(roleData?.permissions)
    }, [open, reset])

    const updateRoleHandler = async (values: any) => {
        try {
            await usersApi.updateRole(roleData?.id, {
                name: roleData?.name,
                permissions: permissionIds,
            })
            toast.success('Role updated successfully.')
            onClose()
            await usersApi.getRoles()
        } catch (error) {
            errorHandler({ error })
        }
    }

    const deleteRoleHandler = async () => {
        try {
            const response = await usersApi.deleteRole(roleData?.id)
            toast.success(response.message)
            onClose()
            await usersApi.getRoles()
        } catch (error) {
            errorHandler({ error })
        }
    }

    const footer: JSX.Element = (
        <Flex justify={'space-between'} align={'center'} gap={16}>
            <Button
                block
                shape={'round'}
                loading={isSubmitting}
                onClick={deleteRoleHandler}
            >
                Delete Role
            </Button>
            <Button
                block
                shape={'round'}
                type="primary"
                htmlType="submit"
                style={{ background: COLORS.colorNeutral950, color: 'white' }}
                loading={isSubmitting}
                onClick={handleSubmit(updateRoleHandler)}
            >
                Save Changes
            </Button>
        </Flex>
    )

    return (
        <Flex>
            <CommonDrawer
                headerTitle={'Permitted Actions'}
                onClose={onClose}
                open={open}
                footer={footer}
            >
                <form>
                    <Flex
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 24,
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
            </CommonDrawer>
        </Flex>
    )
}

export default PermittedActionsDrawer
