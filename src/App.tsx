import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { Login } from './pages/Login/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/login' element={<Login></Login>} />
          <Route path='/' element={<Home></Home>} />


        </Routes>
          
      </BrowserRouter>
    </>
  )
}

export default App
