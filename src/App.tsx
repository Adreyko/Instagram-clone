import React, { useEffect } from 'react'
import Login from './pages/Login/Login'
import { Routes, Route, Link } from 'react-router-dom'
import Registration from './pages/Registration/Registration'
import PagesRoutes from './constants/router-types'
import MainPage from './pages/MainPage/MainPage'
import Profile from './pages/Profile/Profile'
import AnotherUser from './pages/Profile/AnotherUser/AnotherUser'
import NotFound from './pages/NotFound/NotFound'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from './redux/slices/userSlice/userSlice/userSlice'
import { removeUser } from './redux/slices/userSlice/userSlice/userSlice'
import { auth } from './firebase/firebase'
import { useAppDispatch } from './redux/hooks/redux-hooks'
import { fetchUser } from './redux/slices/userSlice/userSlice/thunk/setFetchUser'

const App = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch()


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchUser(user.uid))
      }
    })
  }, [])


  return (


    <div>


      <Routes>
        <Route path={PagesRoutes.SIGN_IN} element={<Login />} />
        <Route path={PagesRoutes.SIGN_UP} element={<Registration />} />
        <Route path={PagesRoutes.MAIN} element={<MainPage />} />
        <Route path={PagesRoutes.PROFILE} element={<Profile />} />
        <Route path={`${PagesRoutes.ANOTHER_USER}/:uid`} element={<AnotherUser />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App