import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Inactive cache garbage collected after 30 minutes
      retry: 1, // Retry failed queries once before showing error
      refetchOnWindowFocus: false, // Prevent unexpected refetches when tabbing back
    },
    mutations: {
      retry: 0,
    },
  },
})
