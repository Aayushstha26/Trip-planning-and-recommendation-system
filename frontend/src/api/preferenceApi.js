import apiClient from './apiClient'

export const preferenceApi = {
  savePreference: async (groupId, data) => {
    const res = await apiClient.post(`/preferences/${groupId}`, data)
    return res.data
  },

  getMyPreference: async (groupId) => {
    const res = await apiClient.get(`/preferences/${groupId}/my`)
    return res.data
  },

  getGroupPreferences: async (groupId) => {
    const res = await apiClient.get(`/preferences/${groupId}`)
    return res.data
  },

  deleteMyPreference: async (groupId) => {
    const res = await apiClient.delete(`/preferences/${groupId}/my`)
    return res.data
  },
}

export default preferenceApi
