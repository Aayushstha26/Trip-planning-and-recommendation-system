import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach JWT token if available
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error('Failed to retrieve auth token from localStorage', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Standardize responses & handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const status = error.response ? error.response.status : null

    if (status === 401) {
      // Unauthorized: clear stale credentials
      try {
        localStorage.removeItem('token')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
      } catch (e) {
        console.error('Failed to clear credentials from storage', e)
      }
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred with the server.'

    return Promise.reject(new Error(message))
  }
)

export default apiClient
export { apiClient }
