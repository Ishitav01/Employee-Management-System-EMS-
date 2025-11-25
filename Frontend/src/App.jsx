import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'
import LoginPage from './pages/LoginPage'

function App() {

  const appRouter = createBrowserRouter([
    {
    path : "/",
    element : 
    // <Suspend>
      <LoginPage />
      // </Suspend>
    }
  ])

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
