import axios from 'axios'
import { apiClient } from '@/config/httpClient'
import { API_ENDPOINTS } from '@/config/endpoints'
import usePermissionStore from '@/store/permissionStore'

export const permissionsApi = {
    getPermissions: async (token: string) => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/user-permissions/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        return response.data
    },
    getPermissionsList: async () => {
        const { setPermissionsList } = usePermissionStore.getState()
        setPermissionsList({ data: [], loading: true })
        const response = await apiClient.get(API_ENDPOINTS.permissions.permissionsList())
        setPermissionsList({ data: response.data, loading: false })
        return response.data
    },
    getUserPermissionsList: async (email: string) => {
        const response = await apiClient.get(API_ENDPOINTS.permissions.userPermissionList(email))
        return response.data
    },
    updateUserPermissions: async (data: object) => {
        const response = await apiClient.post(API_ENDPOINTS.permissions.setUserPermissions(), data)
        return response.data
    },
    createRolePermission: async (data: object) => {
        const response = await apiClient.post(API_ENDPOINTS.permissions.createRolePermission(), data)
        return response.data
    },
}
