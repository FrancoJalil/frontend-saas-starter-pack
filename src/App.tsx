import './App.css'
import { Login } from './pages/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './contexts/AuthContext'

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
