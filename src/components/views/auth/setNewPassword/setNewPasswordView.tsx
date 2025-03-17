import React from 'react'
import { Flex, Typography } from 'antd'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { COLORS } from '@/lib/colors'
import { Title } from '@/components/UI/typography'
import PasswordResetForm from '@/components/forms/passwordResetForm'
import SetNewPasswordForm from '@/components/forms/setNewPasswordForm'

const SetNewPasswordView = () => {
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
                        <Flex style={{ marginBottom: 32 }}>
                            <Link href={'/auth/login'}>
                                <Flex gap={8}>
                                    <HugeiconsIcon
                                        icon={ArrowLeft02Icon}
                                        style={{
                                            color: COLORS.colorNeutral500,
                                        }}
                                    />
                                    <Typography>Back To Sign In</Typography>
                                </Flex>
                            </Link>
                        </Flex>
                        <Title level={1} style={{ marginBottom: 12 }}>
                            Set New Password
                        </Title>
                        <Typography>Must Be Atleast 8 Charactar</Typography>
                    </Flex>
                    <SetNewPasswordForm />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SetNewPasswordView
