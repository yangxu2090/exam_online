

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/index'

const Home = () => {
  const userInfo = useSelector<RootState>(state => state.user)

  return (
    <div>
      我的家
      {JSON.stringify(userInfo)}
    </div>
  )
}

export default Home
