import React, { useEffect, useState } from 'react'
import AppRouter from './routing/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import AOS from 'aos'
import SplashScreen from './components/ui/SplashScreen'

export default function App() {
  // Initialise synchronously from sessionStorage — no flicker on first paint
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('splashShown') === 'true'
  )

  useEffect(() => {
    AOS.refresh()
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true')
    setSplashDone(true)
  }

  return (
    <BrowserRouter>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      {/* Keep AppRouter mounted but hidden while splash plays — prevents flash */}
      <div style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        <AppRouter />
      </div>
    </BrowserRouter>
  )
}
// w-full overflow-x-hidden