import React, { JSX } from 'react'
import { Button, Drawer, DrawerProps, Flex } from 'antd'
import { Title } from '@/components/UI/typography'
import { COLORS } from '@/lib/colors'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'

interface PropsType extends DrawerProps {
    headerTitle: string
}

const CommonDrawer = ({
    children,
    headerTitle,
    footer,
    width,
    open,
    onClose,
    ...props
}: PropsType) => {
    const title: JSX.Element = (
        <Flex justify={'space-between'} align={'center'}>
            <Title level={3}>{headerTitle}</Title>
            <Button
                style={{
                    width: 42,
                    height: 42,
                    padding: 11,
                    borderRadius: 50,
                    border: `1px solid ${COLORS.colorNeutral50}`,
                    cursor: 'pointer',
                }}
                onClick={onClose}
            >
                <HugeiconsIcon
                    icon={Cancel01Icon}
                    width={20}
                    height={20}
                    style={{ color: COLORS.colorNeutral500 }}
                />
            </Button>
        </Flex>
    )
    return (
        <Drawer
            width={width ?? 820}
            title={title}
            footer={footer}
            closeIcon={null}
            open={open}
            className={'common-drawer'}
            style={{ borderRadius: 12 }}
            {...props}
        >
            {children}
        </Drawer>
    )
}

export default CommonDrawer
