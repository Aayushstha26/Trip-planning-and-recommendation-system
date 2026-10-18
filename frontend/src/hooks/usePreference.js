import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { preferenceApi } from '@/api/preferenceApi'
import { GROUP_KEYS } from './useGroup'

export const PREFERENCE_KEYS = {
  all: ['preferences'],
  my: (groupId) => [...PREFERENCE_KEYS.all, 'my', groupId],
  group: (groupId) => [...PREFERENCE_KEYS.all, 'group', groupId],
}

export const useMyPreference = (groupId, options = {}) => {
  return useQuery({
    queryKey: PREFERENCE_KEYS.my(groupId),
    queryFn: () => preferenceApi.getMyPreference(groupId),
    enabled: Boolean(groupId),
    retry: false, // if user has not submitted yet, 404 is expected
    ...options,
  })
}

export const useGroupPreferences = (groupId, options = {}) => {
  return useQuery({
    queryKey: PREFERENCE_KEYS.group(groupId),
    queryFn: () => preferenceApi.getGroupPreferences(groupId),
    enabled: Boolean(groupId),
    ...options,
  })
}

export const useSavePreference = (options = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: ({ groupId, data }) => preferenceApi.savePreference(groupId, data),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (variables?.groupId) {
        queryClient.invalidateQueries({ queryKey: GROUP_KEYS.detail(variables.groupId) })
        queryClient.invalidateQueries({ queryKey: PREFERENCE_KEYS.my(variables.groupId) })
        queryClient.invalidateQueries({ queryKey: PREFERENCE_KEYS.group(variables.groupId) })
      }
      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })
}

export const useDeletePreference = (options = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: (groupId) => preferenceApi.deleteMyPreference(groupId),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (variables) {
        queryClient.invalidateQueries({ queryKey: GROUP_KEYS.detail(variables) })
        queryClient.invalidateQueries({ queryKey: PREFERENCE_KEYS.my(variables) })
        queryClient.invalidateQueries({ queryKey: PREFERENCE_KEYS.group(variables) })
      }
      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })
}
