import apiClient from './apiClient'

export const groupApi = {

  getMyGroups: async () => {
    const res = await apiClient.get('/groups')
    return res.data
  },

  getGroupById: async (id) => {
    const res = await apiClient.get(`/groups/${id}`)
    return res.data
  },

  createGroup: async (groupData) => {
    const res = await apiClient.post('/groups', groupData)
    return res.data
  },
  joinGroup: async ({ inviteCode }) => {
    const res = await apiClient.post('/groups/join', { inviteCode })
    return res.data
  },

  updateGroup: async (id, updateData) => {
    const res = await apiClient.patch(`/groups/${id}`, updateData)
    return res.data
  },

  selectDestination: async (id, destinationId) => {
    const res = await apiClient.patch(`/groups/${id}/destination`, { destinationId })
    return res.data
  },

  deleteGroup: async (id) => {
    return await apiClient.delete(`/groups/${id}`)
  },

  leaveGroup: async (id) => {
    return await apiClient.post(`/groups/${id}/leave`)
  },

  removeMember: async (groupId, userId) => {
    return await apiClient.delete(`/groups/${groupId}/members/${userId}`)
  },
}

export default groupApi
