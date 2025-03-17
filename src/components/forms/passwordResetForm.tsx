'use client'
import React from 'react'
import { Button, Flex, Input, Typography } from 'antd'
import { COLORS } from '@/lib/colors'
import './style/passwordReset.scss'
import { Controller, useForm } from 'react-hook-form'

type FieldType = {
    otp: string
}

const PasswordResetForm = () => {
    const form = useForm<FieldType>()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = form
    const handleResentOTP = () => {
        console.log('ResentOTP: 1234')
    }
    const onSubmit = (values: FieldType) => {
        console.log(values)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="otp"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                        <Input.OTP
                            length={4}
                            size="large"
                            {...field}
                            status={!!errors.otp?.message ? 'error' : ''}
                        />
                    )}
                />
                <Button
                    block
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    className={'mt-10'}
                >
                    Continue
                </Button>
                <Flex justify={'center'} gap={2} style={{ marginTop: 40 }}>
                    <Typography>Didn’t Receive The Code?</Typography>
                    <Typography
                        style={{
                            textDecoration: 'underline',
                            color: COLORS.colorPrimary600,
                            cursor: 'pointer',
                        }}
                        onClick={handleResentOTP}
                    >
                        Click to Resend
                    </Typography>
                </Flex>
            </form>
        </>
    )
}

export default PasswordResetForm
