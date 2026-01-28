import React from 'react'
import AppRouter from './routing/AppRouter'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter> 

  )
}
