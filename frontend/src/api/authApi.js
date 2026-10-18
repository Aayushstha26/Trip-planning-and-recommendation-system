import apiClient from './apiClient'

export const authApi = {
  register: async ({ name, email, password }) => {
    return await apiClient.post('/users/register', { name, email, password })
  },
  login: async ({ email, password }) => {
    return await apiClient.post('/users/login', { email, password })
  },
  getCurrentUser: async () => {
    return await apiClient.get('/users/me')
  },
  logout: async () => {
    return await apiClient.post('/users/logout')
  },
  refreshToken: async () => {
    return await apiClient.post('/users/refresh-token', {})
  },
}

export default authApi
