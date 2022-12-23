import React from 'react'
import Login from './pages/Login/Login'
import { Routes, Route, Link } from 'react-router-dom'
import Registration from './pages/Registration/Registration'
import PagesRoutes from './constants/router-types'
import MainPage from './pages/MainPage/MainPage'
import Profile from './pages/Profile/Profile'
import AnotherUser from './pages/Profile/AnotherUser/AnotherUser'

const App = () => {
  return (
    <div className=''>


      <Routes>
        <Route path={PagesRoutes.SIGN_IN} element={<Login />} />
        <Route path={PagesRoutes.SIGN_UP} element={<Registration />} />
        <Route path={PagesRoutes.MAIN} element={<MainPage/>} />
        <Route path={PagesRoutes.PROFILE} element={<Profile/>} />
        <Route path={PagesRoutes.ANOTHER_USER} element={<AnotherUser/>} />
      </Routes>
    </div>
  )
}

export default App