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

  return useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data, variables, context) => {
      const user = data?.user
      const token = data?.accessToken || data?.token

      if (user && token) {
        dispatch(setCredentials({ user, token }))
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }

      queryClient.invalidateQueries({ queryKey: ['currentUser'] })

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}
