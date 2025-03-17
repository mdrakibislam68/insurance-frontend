import LoginForm from '@/components/forms/loginForm'
import React from 'react'
import { Flex, Typography } from 'antd'
import { Title } from '@/components/UI/typography'

const LoginView = () => {
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
                    <Flex vertical align={'center'}>
                        <Title level={1} style={{ marginBottom: 12 }}>
                            Sign In
                        </Title>
                        <Typography>
                            Please login to continue to your account.
                        </Typography>
                    </Flex>
                    <LoginForm />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default LoginView
