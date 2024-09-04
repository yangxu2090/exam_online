

import React from 'react'
import { useRoutes } from 'react-router-dom'
import routers from './router/index'
const App = () => {
  const router = useRoutes(routers)
  return router
  
}

export default App
