import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/api/authApi'
import { useAppDispatch } from '@/store/hooks'
import { setCredentials, logout as logoutAction } from '@/store/slices/authSlice'

export const useCurrentUser = (options = {}) => {
  const dispatch = useAppDispatch()

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const data = await authApi.getCurrentUser()
        const user = data?.user
        if (user) {
          dispatch(setCredentials({ user }))
        }
        return user ?? null
      } catch (err) {
        dispatch(logoutAction())
        return null
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

export const useRegister = (options = {}) => {
  return useMutation({
    mutationFn: (userData) => authApi.register(userData),
    ...options,
  })
}

export const useLogin = (options = {}) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { onSuccess: customOnSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      const user = data?.user

      if (user) {
        dispatch(setCredentials({ user }))
      }

      queryClient.invalidateQueries({ queryKey: ['currentUser'] })

      if (customOnSuccess) {
        customOnSuccess(data, variables, context)
      }
    },
  })
}

export const useLogout = (options = {}) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { onSuccess: customOnSuccess, ...mutationOptions } = options

  return useMutation({
    mutationFn: () => authApi.logout(),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      dispatch(logoutAction())
      queryClient.clear()

      if (customOnSuccess) {
        customOnSuccess(data, variables, context)
      }
    },
  })
}
