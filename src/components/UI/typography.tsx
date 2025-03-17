'use client'
import { Typography } from 'antd'
import React from 'react'

export const { Paragraph, Text } = Typography

import type { TitleProps as AntdTitleProps } from 'antd/es/typography/Title'

interface TitleProps extends AntdTitleProps {
    children: React.ReactNode
}

export const Title: React.FC<TitleProps> = ({
    children,
    style = {},
    ...props
}) => {
    return (
        <Typography.Title
            style={{ fontFamily: 'Manrope', ...style }}
            {...props}
        >
            {children}
        </Typography.Title>
    )
}
