import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { Login } from './components/routes/Login'
import { ThemeProvider } from './components/theme-provider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Login></Login>
      </ThemeProvider>
    </>
  )
}

export default App
