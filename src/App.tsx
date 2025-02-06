import Router from './Routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 6000,
      gcTime: 6000,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App
