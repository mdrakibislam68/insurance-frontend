import { create } from 'zustand'

interface dataType {
    data: Record<string, any>[]
    loading: boolean
}

interface PermissionState {
    permissionsList: dataType
    setPermissionsList: ({ data, loading }: dataType) => void
}

const usePermissionStore = create<PermissionState>((set) => ({
    permissionsList: {
        data: [],
        loading: true,
    },
    setPermissionsList: ({ data, loading }: dataType) => set({
        permissionsList: {
            data: data,
            loading: loading,
        },
    }),
}))

export default usePermissionStore
