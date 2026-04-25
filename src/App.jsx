import React, { useEffect } from 'react'
import AppRouter from './routing/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import AOS from 'aos'

export default function App() {
  useEffect(() => {
    // Refresh AOS on component mount and route changes
    AOS.refresh()
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter> 

  )
}
