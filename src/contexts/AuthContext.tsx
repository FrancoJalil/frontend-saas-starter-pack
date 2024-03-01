import { createContext } from 'react'
import * as React from 'react';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { FormErrors } from '../pages/Login/Login'

type AuthContextType = {
  user: any
  loginUser: any
  logoutUser: any
};

export const AuthContext = createContext<AuthContextType | null | any>(null)

type Props = {
  children: any
}



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }: Props) => {

  const tokkk = localStorage.getItem('authTokens')

  const navigate = useNavigate()
  let [authTokens, setAuthTokens] = useState(() => tokkk ? JSON.parse(tokkk) : null)
  let [user, setUser] = useState(() => tokkk ? jwtDecode(tokkk) : null)

  let loginUser = async (e: React.FormEvent<HTMLFormElement>, email: string, password: string, setIsLoading: any, setErrors: any, errors: any) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)


    try {
      let response = await fetch('http://localhost:8000/user/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      })

      const data = await response.json()


      if (response.status === 200) {
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        navigate("/")

      } else {
        alert('wrong')
      }
    } catch (err) {
      alert('wrong')
      const newErrors: FormErrors = { passwordLogin: 'Incorrect password' };
      setErrors({ ...errors, ...newErrors });
    } finally {
      setIsLoading(false)
    }

  }

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser
  }

  return (
    <AuthContext.Provider value={contextData} >
      {children}
    </AuthContext.Provider>
  )
}

