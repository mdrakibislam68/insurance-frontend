'use client'
import React from 'react'
import { Button, Flex, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import InputWrapper from '@/components/UI/inputWrapper'
import { ViewIcon, ViewOffSlashIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { COLORS } from '@/lib/colors'

type FieldType = {
    password: string
    confirm_password: string
}

const SetNewPasswordForm = () => {
    const form = useForm<FieldType>({})
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = form

    const onSubmit = (values: FieldType) => {
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex vertical gap={24}>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    }}
                    render={({ field }) => (
                        <InputWrapper
                            label={'Password'}
                            labelFontSize={16}
                            labelFontWeight={500}
                            helperText={errors.password?.message}
                        >
                            <Input.Password
                                {...field}
                                placeholder={'Enter Password'}
                                status={
                                    !!errors.password?.message ? 'error' : ''
                                }
                                iconRender={(visible) =>
                                    visible ? (
                                        <HugeiconsIcon
                                            icon={ViewIcon}
                                            height={20}
                                            width={20}
                                            style={{
                                                color: COLORS.colorNeutral300,
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ) : (
                                        <HugeiconsIcon
                                            icon={ViewOffSlashIcon}
                                            height={20}
                                            width={20}
                                            style={{
                                                color: COLORS.colorNeutral300,
                                                cursor: 'pointer',
                                            }}
                                        />
                                    )
                                }
                            />
                        </InputWrapper>
                    )}
                />
                <Controller
                    name="confirm_password"
                    control={control}
                    rules={{
                        required: 'Confirm Password is required',
                        validate: (value) =>
                            value === form.getValues('password') ||
                            'Passwords do not match',
                    }}
                    render={({ field }) => (
                        <InputWrapper
                            label={'Confirm Password'}
                            labelFontSize={16}
                            labelFontWeight={500}
                            helperText={errors.confirm_password?.message}
                        >
                            <Input.Password
                                {...field}
                                placeholder={'Enter Confirm Password'}
                                status={
                                    !!errors.confirm_password?.message
                                        ? 'error'
                                        : ''
                                }
                                iconRender={(visible) =>
                                    visible ? (
                                        <HugeiconsIcon
                                            icon={ViewIcon}
                                            height={20}
                                            width={20}
                                            style={{
                                                color: COLORS.colorNeutral300,
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ) : (
                                        <HugeiconsIcon
                                            icon={ViewOffSlashIcon}
                                            height={20}
                                            width={20}
                                            style={{
                                                color: COLORS.colorNeutral300,
                                                cursor: 'pointer',
                                            }}
                                        />
                                    )
                                }
                            />
                        </InputWrapper>
                    )}
                />
            </Flex>

            <Button
                block
                type="primary"
                htmlType="submit"
                shape="round"
                className={'mt-10'}
            >
                Reset Password
            </Button>
        </form>
    )
}

export default SetNewPasswordForm
