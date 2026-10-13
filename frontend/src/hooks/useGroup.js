import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { groupApi } from '@/api/groupApi'

/**
 * ============================================================================
 * LOGIC GUIDE - React Query Hooks for Groups (Trip Planning)
 * ============================================================================
 * These hooks communicate with your Express backend:
 * - Queries fetch data and cache it under query keys like ['myGroups'] or ['group', id].
 * - Mutations execute changes (create, join, delete, etc.) and invalidate queries
 *   so the UI automatically re-fetches fresh data from the server.
 */

// Key constants for caching
export const GROUP_KEYS = {
  all: ['groups'],
  myGroups: () => [...GROUP_KEYS.all, 'mine'],
  detail: (id) => [...GROUP_KEYS.all, 'detail', id],
}

/**
 * Hook to fetch all groups the current user belongs to
 * Returns: { data: Array of groups, isLoading, isError, refetch }
 */
export const useMyGroups = (options = {}) => {
  return useQuery({
    queryKey: GROUP_KEYS.myGroups(),
    queryFn: () => groupApi.getMyGroups(),
    // Cache data for 5 minutes, keep it fresh for 1 minute
    staleTime: 1000 * 60,
    ...options,
  })
}

/**
 * Hook to fetch details for a single group by its ID
 * Returns: { data: group object with owner, destination, members, isLoading }
 */
export const useGroupDetails = (groupId, options = {}) => {
  return useQuery({
    queryKey: GROUP_KEYS.detail(groupId),
    queryFn: () => groupApi.getGroupById(groupId),
    enabled: Boolean(groupId), // Only run query if groupId is defined
    ...options,
  })
}

/**
 * Hook to create a new trip group
 * Usage in component:
 *   const { mutate: createGroup, isPending } = useCreateGroup({
 *     onSuccess: (newGroup) => { navigate(`/planner/${newGroup.id}`) }
 *   })
 */
export const useCreateGroup = (options = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: (groupData) => groupApi.createGroup(groupData),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      // 💡 LOGIC TIP: Invalidate 'myGroups' cache so the dashboard immediately shows the new trip!
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.myGroups() })

      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })
}

/**
 * Hook to join a group using an 8-character invite code
 * Usage:
 *   const { mutate: joinGroup, isPending } = useJoinGroup({
 *     onSuccess: (joinedGroup) => { toast.success('Joined group!') }
 *   })
 */
export const useJoinGroup = (options = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: (data) => groupApi.joinGroup(data),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      // 💡 LOGIC TIP: Invalidate list of groups to include the newly joined trip
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.myGroups() })

      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })
}

/**
 * Hook to leave a group (for non-owner members)
 */
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

/**
 * Hook to delete a group (owner only)
 */
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

/**
 * Hook to remove a member from a group (owner only)
 */
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
