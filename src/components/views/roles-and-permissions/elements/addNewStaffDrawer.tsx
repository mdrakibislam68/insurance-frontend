import React, { useState } from 'react'
import { debounce } from 'lodash'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import type { AutoCompleteProps } from 'antd'
import { AutoComplete, Button, Flex, Input, Typography } from 'antd'
import { COLORS } from '@/lib/colors'
import CommonDrawer from '@/components/UI/commonDrawer'
import { toast } from 'react-toastify'
import { usersApi } from '@/services/users/users-api'
import { errorHandler } from '@/lib/error'
import userStore from '@/store/userStore'
import UserSearchItem from '@/components/views/roles-and-permissions/elements/userSearchItem'
import InputWrapper from '@/components/UI/inputWrapper'

interface PropsTypes {
    open: boolean
    onClose: () => void
}

interface FormValues {
    email: string
    first_name?: string
    last_name?: string
}

const AddNewStaffDrawer: React.FC<PropsTypes> = ({ open, onClose }) => {
    const form = useForm<FormValues>()
    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        reset,
    } = form

    const { roleData } = userStore()

    const [options, setOptions] = useState<AutoCompleteProps['options']>([])

    const onSelect = (data: string) => {
        setValue('email', data)
    }

    const onSearch = debounce(async (searchText: string) => {
        if (!searchText) return

        try {
            const result = await usersApi.searchUsers(searchText)
            setOptions(
                result.map((el: any) => {
                    return {
                        value: el.email,
                        label: (
                            <UserSearchItem
                                email={el.email}
                                avatar={el.avatar}
                                onClick={() => {
                                    reset({
                                        first_name: el.first_name,
                                        last_name: el.last_name,
                                    })
                                }}
                            />
                        ),
                    }
                })
            )
        } catch (error) {
            errorHandler({ error })
        }
    }, 300)

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const roleId = roleData?.id
        try {
            const response = await usersApi.addUserFromAdmin({
                ...data,
                role: roleId,
            })
            toast.success(response.message)
            onClose()
            reset()
            await usersApi.getRoleUsers(roleId)
            await usersApi.getRoles()
        } catch (error) {
            errorHandler({ form, error })
        }
    }

    const footer = (
        <Flex justify={'space-between'} align={'center'} gap={16}>
            <Button block shape={'round'} danger onClick={onClose}>
                Cancel
            </Button>
            <Button
                block
                shape={'round'}
                type="primary"
                htmlType="submit"
                style={{ background: COLORS.colorNeutral950, color: 'white' }}
                onClick={handleSubmit(onSubmit)}
            >
                Save Changes
            </Button>
        </Flex>
    )

    return (
        <CommonDrawer
            headerTitle="Add New Staff"
            footer={footer}
            onClose={onClose}
            open={open}
            width={560}
        >
            <form>
                <Flex vertical gap={24}>
                    <Flex vertical gap={10}>
                        <Flex vertical gap={12}>
                            <Typography style={{ fontSize: 14 }}>
                                Email
                            </Typography>

                            <Controller
                                name={'email'}
                                control={control}
                                rules={{
                                    required: 'Email is required',
                                    // pattern: {
                                    //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    //     message: 'Invalid email address',
                                    // },
                                }}
                                render={({ field }) => (
                                    <AutoComplete
                                        options={options}
                                        onSelect={onSelect}
                                        onSearch={onSearch}
                                        {...field}
                                    >
                                        <Input placeholder="example@gmail.com" />
                                    </AutoComplete>
                                )}
                            />
                        </Flex>
                        {errors.email && (
                            <Typography style={{ color: COLORS.colorRed400, fontSize: 12 }}>
                                {errors.email.message}
                            </Typography>
                        )}
                    </Flex>

                    <Controller
                        name={'first_name'}
                        control={control}
                        render={({ field }) => (
                            <InputWrapper
                                label={'First Name'}
                                helperText={errors.first_name?.message}
                            >
                                <Input
                                    placeholder="Your First Name"
                                    status={
                                        !!errors.first_name?.message
                                            ? 'error'
                                            : ''
                                    }
                                    {...field}
                                />
                            </InputWrapper>
                        )}
                    />

                    <Controller
                        name={'last_name'}
                        control={control}
                        render={({ field }) => (
                            <InputWrapper
                                label={'Last Name'}
                                helperText={errors.last_name?.message}
                            >
                                <Input
                                    placeholder="Last Name"
                                    status={
                                        !!errors.last_name?.message
                                            ? 'error'
                                            : ''
                                    }
                                    {...field}
                                />
                            </InputWrapper>
                        )}
                    />
                </Flex>
            </form>
        </CommonDrawer>
    )
}

export default AddNewStaffDrawer
