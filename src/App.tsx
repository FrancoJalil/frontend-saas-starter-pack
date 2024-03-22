import { Login } from './pages/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { BuyTokens } from './pages/BuyTokens/BuyTokens'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AxiosInterceptor } from './interceptors/axios'
import { Toaster } from "@/components/ui/toaster"
import { SettingsRoutes } from './pages/Settings/SettingsRoutes'
import { GeneralSettings } from './pages/Settings/components/GeneralSettings'
import { Contact } from './pages/Settings/components/Contact'
import { ChangePassword } from './pages/Settings/components/ChangePassword'
import { MyPurchases } from './pages/Settings/components/MyPurchases'
import { VerifyAccount } from './pages/Settings/components/VerifyAccount'

const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID


function App() {

  return (
    <>
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <Toaster />

        <BrowserRouter>
          <AuthProvider>
            <AxiosInterceptor />
            <Routes>

              <Route element={<PrivateRoutes />}>
                <Route element={<Home />} path="/" />
                <Route element={<BuyTokens />} path="/buy-tokens" />
                <Route element={<SettingsRoutes />} path="/settings/" >
                  <Route element={<GeneralSettings />} path="" />
                  <Route element={<Contact />} path="contact" />
                  <Route element={<ChangePassword />} path="change-password" />
                  <Route element={<MyPurchases />} path="my-purchases" />
                  <Route element={<VerifyAccount />} path="verify" />
                </Route>


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
