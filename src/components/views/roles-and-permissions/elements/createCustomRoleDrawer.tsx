import React, { JSX } from 'react'
import { Button, Flex, Input } from 'antd'
import { COLORS } from '@/lib/colors'
import { Controller, useForm } from 'react-hook-form'
import PermissionCard from '@/components/views/roles-and-permissions/elements/permissionCard'
import CommonDrawer from '@/components/UI/commonDrawer'
import usePermissionStore from '@/store/permissionStore'
import { usersApi } from '@/services/users/users-api'
import { permissionsApi } from '@/services/permissions/permissions-api'
import { toast } from 'react-toastify'
import { errorHandler } from '@/lib/error'
import InputWrapper from '@/components/UI/inputWrapper'

interface PropsType {
    open: boolean
    onClose: () => void
    data: any
}

interface RoleFormTypes {
    name: string
}

const CreateCustomRoleDrawer = ({ open, onClose }: PropsType) => {
    const { permissionsList } = usePermissionStore()
    const [permissionIds, setPermissionIds] = React.useState<any[]>([])
    const form = useForm<RoleFormTypes>()
    const {
        reset,
        handleSubmit,
        control,
        formState: { errors },

        // formState: { errors, isSubmitting, defaultValues },
    } = form

    const createRoleHandler = async (data: any) => {
        try {
            const response = await permissionsApi.createRolePermission({
                ...data,
                permissions: permissionIds,
            })
            toast.success(
                'Custom role created. But no response message set form backend.',
            )
            onClose()
            reset()
            await usersApi.getRoles()
        } catch (error) {
            errorHandler({ error, form })
        }
        console.log(data)
    }

    const footer: JSX.Element = (
        <Flex justify={'space-between'} align={'center'} gap={16}>
            <Button block shape={'round'} onClick={onClose}>
                Cancel
            </Button>
            <Button
                block
                shape={'round'}
                type="primary"
                htmlType="submit"
                style={{ background: COLORS.colorNeutral950, color: 'white' }}
                onClick={handleSubmit(createRoleHandler)}
            >
                Save Changes
            </Button>
        </Flex>
    )
    return (
        <CommonDrawer
            headerTitle={'Create Custom Role'}
            onClose={onClose}
            open={open}
            footer={footer}
        >
            <Flex vertical gap={24}>
                <form>
                    <Flex
                        vertical
                        style={{
                            padding: 24,
                            paddingTop: 20,
                            borderRadius: 12,
                            border: `1px solid ${COLORS.colorNeutral50}`,
                        }}
                    >
                        <Controller
                            name={'name'}
                            control={control}
                            render={({ field }) => (
                                <InputWrapper
                                    label={'Create Role'}
                                    helperText={errors.name?.message}
                                >
                                    <Input
                                        placeholder={'Customer Role Name'}
                                        status={
                                            !!errors.name?.message
                                                ? 'error'
                                                : ''
                                        }
                                        {...field}
                                    />
                                </InputWrapper>
                            )}
                        />
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

export default CreateCustomRoleDrawer
