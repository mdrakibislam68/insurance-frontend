import React from 'react'
import { Flex, Typography } from 'antd'
import { Title } from '@/components/UI/typography'
import ForgotPasswordForm from '@/components/forms/forgotPasswordForm'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { COLORS } from '@/lib/colors'

const ForgotPasswordView = () => {
    return (
        <Flex
            vertical
            justify={'center'}
            className={'min-h-[calc(100vh-64px)] w-full'}
        >
            <Flex align={'center'} justify={'center'} className={'w-full'}>
                <Flex
                    vertical
                    gap={32}
                    style={{ padding: 40 }}
                    className={'bg-white rounded-3xl max-w-[479px] w-full'}
                >
                    <Flex vertical>
                        <Link href={'/auth/login'}>
                            <Flex gap={8}>
                                <HugeiconsIcon
                                    icon={ArrowLeft02Icon}
                                    style={{
                                        color: COLORS.colorNeutral500,
                                        marginBottom: 32,
                                    }}
                                />
                                <Typography>Back To Sign In</Typography>
                            </Flex>
                        </Link>
                        <Title level={1} style={{ marginBottom: 12 }}>
                            Forgot password?
                        </Title>
                        <Typography>
                            Don’t worry! It happens. Please enter the email
                            associated with your account.
                        </Typography>
                    </Flex>
                    <ForgotPasswordForm />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ForgotPasswordView
