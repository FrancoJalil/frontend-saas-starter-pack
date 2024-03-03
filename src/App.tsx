import './App.css'
import { Login } from './pages/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  return (
    <>
      <GoogleOAuthProvider clientId="393246352399-e6manv1gvibqlnpba7lsu0s9ob0patgt.apps.googleusercontent.com">

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

      </GoogleOAuthProvider>

    </>
  )
}

export default App
