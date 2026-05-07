import React, { useEffect, useState } from 'react'
import AppRouter from './routing/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import AOS from 'aos'
import SplashScreen from './components/ui/SplashScreen'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Check if splash was already shown this session
    const splashShown = sessionStorage.getItem('splashShown')
    if (splashShown) {
      setShowSplash(false)
    } else {
      sessionStorage.setItem('splashShown', 'true')
    }

    AOS.refresh()
  }, [])

  return (
    <BrowserRouter>
      {showSplash ? <SplashScreen /> : <AppRouter />}
    </BrowserRouter>
  )
}