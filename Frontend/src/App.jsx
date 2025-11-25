import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

function App() {

  const appRouter = createBrowserRouter([
    {
    path : "/",
    element : 
    // <Suspend>
      <LoginPage />
      // </Suspend>
    },
    {
      path : "/dashboard",
      element : <Dashboard />
    }
  ])

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
