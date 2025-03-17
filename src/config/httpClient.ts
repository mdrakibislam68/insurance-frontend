import axios from 'axios'
import { getSession } from 'next-auth/react'

let sessionCache: any = null

const getCachedSession = async () => {
    if (!sessionCache) {
        sessionCache = await getSession()
    }
    return sessionCache
}

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor
apiClient.interceptors.request.use(
    async (config) => {
        const session = await getCachedSession()
        const user = session?.user

        if (user) {
            const token = user?.access
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)
