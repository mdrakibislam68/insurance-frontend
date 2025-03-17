'use client'
import React from 'react'
import { Button, Input } from 'antd'
import InputWrapper from '@/components/UI/inputWrapper'
import { Controller, useForm } from 'react-hook-form'

type FieldType = {
    email: string
}

const ForgotPasswordForm = () => {
    const form = useForm<FieldType>()
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
                            status={!!errors.email?.message ? 'error' : ''}
                        />
                    </InputWrapper>
                )}
            />
            <Button
                block
                type="primary"
                htmlType="submit"
                shape="round"
                className={'mt-10'}
            >
                Send code
            </Button>
        </form>
    )
}

export default ForgotPasswordForm
