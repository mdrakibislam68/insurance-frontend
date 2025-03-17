import { create } from 'zustand'

interface dataType {
    data?: Record<string, any>[]
    loading?: boolean
}

interface UserState {
    roles: Record<string, any>[]
    setRoles: (data: Record<string, any>[]) => void
    roleUsers: dataType
    setUserRoles: ({ data, loading }: dataType) => void
    roleData: Record<string, any> | null
    setRoleData: (data: Record<string, any>) => void
}

const useUserStore = create<UserState>((set) => ({
    roles: [],
    roleData: null,
    roleUsers: {
        data: [],
        loading: true,
    },
    setRoles: (data: Record<string, any>[]) => set({ roles: data }),
    setRoleData: (data: Record<string, any> | null) => set({ roleData: data }),
    setUserRoles: ({ data, loading }: dataType) => set({
        roleUsers: {
            data: data,
            loading: loading,
        },
    }),
}))

export default useUserStore
