import { apiClient } from '@/config/httpClient'
import { API_ENDPOINTS } from '@/config/endpoints'
import useUserStore from '@/store/userStore'

export const usersApi = {
    getRoles: async () => {
        const response = await apiClient.get(API_ENDPOINTS.users.roles())
        const { setRoles } = useUserStore.getState()
        setRoles(response.data)
        return response.data
    },
    getRoleOptions: async () => {
        const response = await apiClient.get(API_ENDPOINTS.users.roleOptions())
        return response.data
    },
    getRoleUsers: async (roleId: number) => {
        const { setUserRoles } = useUserStore.getState()
        setUserRoles({ loading: true })
        const response = await apiClient.get(API_ENDPOINTS.users.role_users(roleId))
        setUserRoles({ data: response.data, loading: false })
        return response.data
    },
    updateRole: async (roleId: number, data: object) => {
        const response = await apiClient.put(API_ENDPOINTS.users.roleSingle(roleId), data)
        return response.data
    },
    deleteRole: async (roleId: number) => {
        const response = await apiClient.delete(API_ENDPOINTS.users.roleSingle(roleId))
        return response.data
    },
    deleteUser: async (data: object) => {
        const response = await apiClient.post(API_ENDPOINTS.users.deleteUser(), data)
        return response.data
    },
    addUserFromAdmin: async (data: object) => {
        const response = await apiClient.post(API_ENDPOINTS.users.addUserFromAdmin(), data)
        return response.data
    },
    searchUsers: async (searchParams: string) => {
        const response = await apiClient.get(API_ENDPOINTS.users.searchUsers(searchParams))
        return response.data
    },
}
