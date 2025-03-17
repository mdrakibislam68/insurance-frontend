'use client'
import { Button, Checkbox, CheckboxProps, Flex, Input, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import Link from 'next/link'
import { COLORS } from '@/lib/colors'
import { Controller, useForm } from 'react-hook-form'
import InputWrapper from '@/components/UI/inputWrapper'
import { HugeiconsIcon } from '@hugeicons/react'
import { ViewIcon, ViewOffSlashIcon } from '@hugeicons/core-free-icons'

type FieldType = {
    email: string
    password: string
}

const LoginForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const form = useForm<FieldType>()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = form

    const onSubmit = (values: FieldType) => {
        setLoading(true)
        signIn('credentials', {
            ...values,
            redirect: false,
        })
            .then((response) => {
                if (response?.error) {
                    try {
                        const errors = JSON.parse(response.error)
                        console.log(errors)
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    router.push('/dashboard')
                }
            })
            .finally(() => setLoading(false))
    }

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex vertical gap={24}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Please enter a valid email',
                            },
                        }}
                        render={({ field }) => (
                            <InputWrapper
                                label={'Email'}
                                labelFontSize={16}
                                labelFontWeight={500}
                                helperText={errors.email?.message}
                            >
                                <Input
                                    {...field}
                                    placeholder={'Enter your valid email'}
                                    status={
                                        !!errors.email?.message ? 'error' : ''
                                    }
                                />
                            </InputWrapper>
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Password is required',
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
                                    placeholder={'Enter your valid password'}
                                    status={
                                        !!errors.password?.message
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

                <Flex
                    justify="space-between"
                    style={{ marginBottom: 40, marginTop: 24 }}
                >
                    <Checkbox onChange={onChange}>
                        <Typography>Remember Account</Typography>
                    </Checkbox>
                    <Link href={'/auth/forgot-password'}>
                        <Typography
                            style={{
                                textDecoration: 'underline',
                                fontWeight: 500,
                                color: COLORS.colorNeutral950,
                            }}
                        >
                            Forgot Password?
                        </Typography>
                    </Link>
                </Flex>

                <Button
                    block
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    loading={loading}
                >
                    Submit
                </Button>

                <Flex justify={'center'} gap={2} style={{ marginTop: 40 }}>
                    <Typography>Need an account?</Typography>
                    <Link
                        href={'/auth/signup'}
                        style={{
                            textDecoration: 'underline',
                            color: COLORS.colorPrimary600,
                        }}
                    >
                        Create one
                    </Link>
                </Flex>
            </form>
        </>
    )
}

export default LoginForm
