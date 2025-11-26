import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import LoadingPage from './components/LoadingPage'
import AddEditEmployee from './components/AddEditEmployee.jsx'

const DashboardPage = lazy(() => import('../src/pages/Dashboard'))

function App() {

  const appRouter = createBrowserRouter([
    {
    path : "/",
    element : 
      <Suspense fallback={<LoadingPage />}>
      <LoginPage />
      </Suspense>
    },
    {
      path : "/dashboard",
      element : 
      <Suspense fallback={<LoadingPage />}>
      <DashboardPage />
      </Suspense>
    },
    {
      path : "/addEditEmployee",
      element : 
      <Suspense fallback={<LoadingPage />}>
      <AddEditEmployee/>
      </Suspense>
    }
  ])

  return (
    <>
      <RouterProvider router={appRouter}/>

    </>
  )
}

export default App
