import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate, Outlet } from 'react-router-dom'

type Props = {
    children: any
    rest: any
}

export const PrivateRoutes = () => {

  let { user } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
}

