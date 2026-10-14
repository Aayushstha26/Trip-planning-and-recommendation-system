import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { store } from './store'
import { queryClient } from './config/queryClient'
import { AppRoutes } from './router/AppRoutes'
import { useCurrentUser } from './hooks/useAuth'

function AuthInitializer({ children }) {
  useCurrentUser()
  return children
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer>
          <TooltipProvider delayDuration={0}>
            <BrowserRouter>
              <AppRoutes />
              <Toaster position="top-right" richColors closeButton />
            </BrowserRouter>
          </TooltipProvider>
        </AuthInitializer>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Provider>
  )
}

export default App
