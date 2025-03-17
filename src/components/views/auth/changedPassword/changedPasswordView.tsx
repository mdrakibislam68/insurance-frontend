import React from 'react'
import { Button, Flex, Typography } from 'antd'
import { Title } from '@/components/UI/typography'
import { CheckmarkCircleIcon } from '@/assets/svgIcons/checkmarkCircleIcon'
import { COLORS } from '@/lib/colors'

const ChangedPasswordView = () => {
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
                    align={'center'}
                    style={{ padding: 40 }}
                    className={'bg-white rounded-3xl max-w-[479px] w-full'}
                >
                    <Flex
                        justify={'center'}
                        align={'center'}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 50,
                            backgroundColor: COLORS.colorPrimary400,
                        }}
                    >
                        <CheckmarkCircleIcon />
                    </Flex>
                    <Flex vertical align={'center'}>
                        <Title level={1} style={{ marginBottom: 12 }}>
                            Password changed
                        </Title>
                        <Typography style={{ textAlign: 'center' }}>
                            Your Password Has Been Reset So Now You Can Log In
                            To Your Account
                        </Typography>
                    </Flex>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        shape="round"
                    >
                        Send code
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ChangedPasswordView
