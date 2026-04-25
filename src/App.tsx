import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/layout/Layout'
import Loading from './components/ui/Loading'

const Home = lazy(() => import('./pages/Home'))
const Games = lazy(() => import('./pages/Games'))
const GameDetails = lazy(() => import('./pages/GameDetails'))
const NotFound = lazy(() => import('./pages/NotFound'))

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
})

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { path: '/', element: <Suspense fallback={<Loading />}><Home /></Suspense> },
      { path: 'home', element: <Suspense fallback={<Loading />}><Home /></Suspense> },
      { path: 'game/all', element: <Suspense fallback={<Loading />}><Games /></Suspense> },
      // Redirect old path parameters to the new query parameter structure
      { path: 'game/:filter/:value', element: <Navigate to="/game/all" replace /> },
      { path: 'game/gameDetails/:id', element: <Suspense fallback={<Loading />}><GameDetails /></Suspense> },
      { path: '*', element: <Suspense fallback={<Loading />}><NotFound /></Suspense> },
    ],
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
