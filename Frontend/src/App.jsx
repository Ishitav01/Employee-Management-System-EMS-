import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import LoadingPage from './components/LoadingPage'
import HeaderWrapper from './components/HeaderWrapper'
import { SnackbarProvider } from './context/SnackbarContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import '../src/styles/App.css'
import '../src/styles/Dashboard.css'
import '../src/styles/NoEmployeeFound.css'
import useDarkMode from './hooks/useDarkMode.js'

const DashboardPage = lazy(() => import('../src/pages/Dashboard/index.jsx'))
const NotFound = lazy(() => import('../src/pages/NotFound.jsx'))
const ProfileCard = lazy(() => import('../src/pages/ProfileCard.jsx'))

function App() {

  const {dark,setDark} = useDarkMode();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element:
        <LoginPage />
    },
    {
      path: "/dashboard",
      element:
        <HeaderWrapper>
          <DashboardPage />
        </HeaderWrapper>
    },
    {
      path: "/user",
      element:
        <HeaderWrapper>
          <ProfileCard />
        </HeaderWrapper>
    },
    {
      path: "*", element:
        <NotFound />

    },
  ])

  return (
    <>
      <button 
        onClick={() => setDark(!dark)}
        className="dark-toggle-btn"
      >
        {dark ? "☀" : "🌙"}
      </button>
      <UserProvider>
        <SnackbarProvider>
          <Suspense fallback={<LoadingPage />}>

            <RouterProvider router={appRouter} />
          </Suspense>
        </SnackbarProvider>
      </UserProvider>
    </>
  )
}

export default App
