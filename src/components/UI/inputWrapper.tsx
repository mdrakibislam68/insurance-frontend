import React from 'react'
import { Flex, Typography } from 'antd'
import { COLORS } from '@/lib/colors'

interface PropsType {
    label?: string
    labelFontSize?: number
    labelFontWeight?: number
    helperText?: string
    children: React.ReactNode
}

const InputWrapper = ({
    label,
    helperText,
    labelFontSize = 12,
    labelFontWeight = 400,
    children,
}: PropsType) => {
    return (
        <Flex vertical gap={12}>
            {label && (
                <Typography
                    style={{
                        fontSize: labelFontSize,
                        fontWeight: labelFontWeight,
                        color: COLORS.colorNeutral950,
                    }}
                >
                    {label}
                </Typography>
            )}
            <Flex vertical gap={4}>
                {children}
                {helperText && (
                    <Typography
                        style={{
                            color: COLORS.colorRed400,
                            fontSize: 12,
                        }}
                    >
                        {helperText}
                    </Typography>
                )}
            </Flex>
        </Flex>
    )
}

export default InputWrapper
