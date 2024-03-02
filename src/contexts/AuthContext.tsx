import { createContext } from 'react'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "@/models/context"

export const AuthContext = createContext<AuthContextType | null | any>(null)

type Props = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {

  const navigate = useNavigate()

  const [authTokens, setAuthTokens] = useState(() => {
    try {
      const storedTokens = localStorage.getItem("authTokens");
      return storedTokens ? JSON.parse(storedTokens) : null;
    } catch (error) {
      console.error("Error parsing auth tokens from localStorage:", error);
      localStorage.removeItem('authTokens')
      navigate('/login')
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const storedTokens = localStorage.getItem("authTokens");
      return storedTokens ? jwtDecode(storedTokens) : null;
    } catch (error) {
      console.error("Error decoding user from auth tokens:", error);
      setAuthTokens(null)
      localStorage.removeItem('authTokens')
      navigate('/login')
    }
  });

  let [loadingWebsite, setIsLoadingWebsite] = useState(true)

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

        throw new Error('Invalid response');
      }
    } catch (err) {
      const newErrors: { passwordLogin?: string } = {};
      newErrors.passwordLogin = 'Invalid password'

      setErrors({ ...errors, ...newErrors });
      return Object.keys(newErrors).length === 0;
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

  let updateToken = async () => {
    console.log("UPDATE TOKEN CALLED")
    try {
      let response = await fetch('http://localhost:8000/user/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: authTokens?.refresh })
      })

      const data = await response.json()


      if (response.status === 200) {
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))


      } else {
        throw new Error('Invalid token');
      }
    } catch (err) {
      console.error(err)
      logoutUser()
    }

    if (loadingWebsite) {
      setIsLoadingWebsite(false)
    }
  }

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser
  }

  useEffect(() => {

    if (loadingWebsite) {
      updateToken()
    }

    let fourMinutes = 1000 * 60 * 4
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)

  }, [authTokens, loadingWebsite])

  return (
    <AuthContext.Provider value={contextData} >
      {loadingWebsite ? null : children}
    </AuthContext.Provider>
  )
}

