import React, { useState } from 'react'
import { Button, Flex, Typography } from 'antd'
import { Title } from '@/components/UI/typography'
import { COLORS } from '@/lib/colors'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon, Settings01Icon } from '@hugeicons/core-free-icons'
import userStore from '@/store/userStore'
import PermittedActionsDrawer from '@/components/views/roles-and-permissions/elements/permittedActionsDrawer'
import AddNewStaffDrawer from '@/components/views/roles-and-permissions/elements/addNewStaffDrawer'

interface OpenStateTypes {
    permittedActionsDrawer: boolean
    addNewStaffDrawer: boolean
}
const RolesAndPermissionHeader = () => {
    const [open, setOpen] = useState<OpenStateTypes>({
        permittedActionsDrawer: false,
        addNewStaffDrawer: false,
    })
    const { roleData } = userStore()
    const showPermittedActionsDrawer = () => {
        setOpen((prev) => ({
            ...prev,
            permittedActionsDrawer: true,
        }))
    }

    const showAddNewStaffDrawer = () => {
        setOpen((prev) => ({
            ...prev,
            addNewStaffDrawer: true,
        }))
    }

    const onClose = (drawer: keyof OpenStateTypes) => {
        setOpen((prev) => ({
            ...prev,
            [drawer]: false,
        }))
    }
    return (
        <>
            <Flex justify={'space-between'} style={{ marginBottom: 32 }}>
                <Flex vertical gap={8}>
                    <Title level={3} style={{ fontWeight: 500 }}>
                        {roleData?.name}
                    </Title>
                    <Typography
                        style={{ fontSize: 14, color: COLORS.colorNeutral500 }}
                    >
                        Full control over system settings and user management.
                    </Typography>
                </Flex>
                <Flex align={'center'} gap={12}>
                    <Button
                        shape={'round'}
                        icon={
                            <HugeiconsIcon
                                icon={PlusSignIcon}
                                height={16}
                                width={16}
                            />
                        }
                        onClick={showAddNewStaffDrawer}
                    >
                        Add User
                    </Button>
                    {!roleData?.is_admin && (
                        <Flex
                            align={'center'}
                            justify={'center'}
                            style={{
                                width: 42,
                                height: 42,
                                borderRadius: 50,
                                border: `1px solid ${COLORS.colorNeutral50}`,
                                cursor: 'pointer',
                            }}
                            onClick={showPermittedActionsDrawer}
                        >
                            <HugeiconsIcon icon={Settings01Icon} />
                        </Flex>
                    )}
                </Flex>
            </Flex>
            <PermittedActionsDrawer
                open={open.permittedActionsDrawer}
                onClose={() => onClose('permittedActionsDrawer')}
            />
            <AddNewStaffDrawer
                open={open.addNewStaffDrawer}
                onClose={() => onClose('addNewStaffDrawer')}
            />
        </>
    )
}

export default RolesAndPermissionHeader
