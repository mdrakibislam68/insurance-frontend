import React from 'react'
import { Avatar, Flex, Typography } from 'antd'

interface PropsTypes {
    email: string
    avatar?: string
    onClick?: () => void
}

const UserSearchItem = ({ email, avatar, onClick }: PropsTypes) => {
    return (
        <Flex align="center" gap={8} onClick={onClick}>
            <Avatar src={avatar} alt={email} size={24} />
            <Typography style={{ fontSize: 14 }}>{email}</Typography>
        </Flex>
    )
}

export default UserSearchItem
