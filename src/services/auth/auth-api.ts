import { apiClient } from '@/config/httpClient'
import { API_ENDPOINTS } from '@/config/endpoints'

export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthResponse {
    token: string
    user: {
        id: string
        email: string
        name?: string
    }
}

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(
            API_ENDPOINTS.auth.login,
            credentials
        )
        return response.data
    },
}
