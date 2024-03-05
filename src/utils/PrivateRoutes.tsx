import { Navbar } from '@/components/Navbar'
import { AuthContext } from '@/contexts/AuthContext'
import { AuthContextType } from '@/models/context'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {

  let { user } = useContext(AuthContext) as AuthContextType

  return (
    <>
      <Navbar />

      {user ? <Outlet /> : <Navigate to="/login" />}
    </>
  )
}

