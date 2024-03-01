import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { Login } from './pages/Login/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider, AuthContext } from './contexts/AuthContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='*' element={<>404 NOT FOUND</>} />
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" />
            </Route>
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
