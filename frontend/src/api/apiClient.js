import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
})

apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const status = error.response ? error.response.status : null
    const requestUrl = error.config?.url || ''
    const isAuthEndpoint =
      requestUrl.includes('/users/login') ||
      requestUrl.includes('/users/register') ||
      requestUrl.includes('/users/me')
    const isLoginPage = window.location.pathname === '/login'

    if (status === 401 && !isAuthEndpoint && !isLoginPage) {
          window.location.href = '/login'
        }

    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.'
    return Promise.reject(new Error(message))
  }
)

export default apiClient
export { apiClient }
