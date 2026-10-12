import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/api/authApi'
import { useAppDispatch } from '@/store/hooks'
import { setCredentials, logout as logoutAction } from '@/store/slices/authSlice'

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
      const token = data?.accessToken || data?.token

      if (user && token) {
        dispatch(setCredentials({ user, token }))
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
