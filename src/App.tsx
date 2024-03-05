import './App.css'
import { Login } from './pages/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { BuyTokens } from './pages/BuyTokens/BuyTokens'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AxiosInterceptor } from './interceptors/axios'
import { Settings } from './pages/Settings/Settings'


function App() {

  return (
    <>
      <GoogleOAuthProvider clientId="393246352399-e6manv1gvibqlnpba7lsu0s9ob0patgt.apps.googleusercontent.com">

        <BrowserRouter>
          <AuthProvider>
            <AxiosInterceptor />
            <Routes>

              <Route element={<PrivateRoutes />}>
                <Route element={<Home />} path="/" />
                <Route element={<BuyTokens />} path="/buy-tokens" />
                <Route element={<Settings />} path="/settings" />


              </Route>

              <Route path='*' element={<>404 NOT FOUND</>} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </AuthProvider>

        </BrowserRouter>

      </GoogleOAuthProvider>

    </>
  )
}

export default App
