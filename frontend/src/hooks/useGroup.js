import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { groupApi } from '@/api/groupApi'


export const GROUP_KEYS = {
  all: ['groups'],
  myGroups: () => [...GROUP_KEYS.all, 'mine'],
  detail: (id) => [...GROUP_KEYS.all, 'detail', id],
}

export const useMyGroups = (options = {}) => {
  return useQuery({
    queryKey: GROUP_KEYS.myGroups(),
    queryFn: () => groupApi.getMyGroups(),
    staleTime: 1000 * 60,
    ...options,
  })
}

export const useGroupDetails = (groupId, options = {}) => {
  return useQuery({
    queryKey: GROUP_KEYS.detail(groupId),
    queryFn: () => groupApi.getGroupById(groupId),
    enabled: Boolean(groupId), // Only run query if groupId is defined
    ...options,
  })
}

export const useCreateGroup = (options = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: (groupData) => groupApi.createGroup(groupData),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.myGroups() })

      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })
}

export const useJoinGroup = (options = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: (data) => groupApi.joinGroup(data),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.myGroups() })

      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })
}

export const useLeaveGroup = (options = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: (groupId) => groupApi.leaveGroup(groupId),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.myGroups() })
      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })
}

export const useDeleteGroup = (options = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: (groupId) => groupApi.deleteGroup(groupId),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.myGroups() })
      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })
}

export const useRemoveMember = (options = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: ({ groupId, userId }) => groupApi.removeMember(groupId, userId),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.detail(variables.groupId) })
      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })
}
