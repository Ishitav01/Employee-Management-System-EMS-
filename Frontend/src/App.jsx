import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import LoadingPage from './components/LoadingPage'
import AddEditEmployee from './components/AddEditEmployee.jsx'
import HeaderWrapper from './components/HeaderWrapper'
import ProfileCard from './pages/ProfileCard'

const DashboardPage = lazy(() => import('../src/pages/Dashboard/index.jsx'))
const NotFound = lazy(() => import('../src/pages/NotFound.jsx'))

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element:
        <Suspense fallback={<LoadingPage />}>
          <LoginPage />
        </Suspense>
    },
    {
      path: "/dashboard",
      element:
        <Suspense fallback={<LoadingPage />}>
          <HeaderWrapper>
            <DashboardPage />
          </HeaderWrapper>
        </Suspense>
    },
    {
      path: "/user",
      element:
        <Suspense fallback={<LoadingPage />}>
          <HeaderWrapper>
            <ProfileCard />
          </HeaderWrapper>
        </Suspense>
    },
    {
      path: "*", element:
        <Suspense fallback={<LoadingPage />}>
          <NotFound />
        </Suspense>
    },
  ])

  return (
    <>
      <RouterProvider router={appRouter} />

    </>
  )
}

export default App
