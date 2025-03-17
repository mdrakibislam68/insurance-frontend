'use client'
import { Table } from 'antd'

interface PropTypes {
    data: Record<string, any>[]
    columns: any[]
    loading?: boolean
}

const RolesTable = ({ data, columns, loading }: PropTypes) => {
    return (
        <>
            <Table
                style={{ width: '100%' }}
                dataSource={data.map((item, index) => ({
                    ...item,
                    key: item.id || index,
                }))}
                columns={columns}
                loading={loading}
                pagination={false}
            />
        </>
    )
}
export default RolesTable
