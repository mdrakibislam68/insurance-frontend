import React from 'react'
import Image from 'next/image'
import { Flex } from 'antd'
import Link from 'next/link'

const Header = () => {
    return (
        <Flex style={{ position: 'fixed', top: 32, left: 32 }}>
            <Link href="/">
                <Image
                    width={265}
                    height={60}
                    src="/logo.svg"
                    alt="logo"
                    priority
                />
            </Link>
        </Flex>
    )
}

export default Header
