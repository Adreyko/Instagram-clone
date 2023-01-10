import React, { useEffect, useState } from 'react'
import Login from './pages/Login/Login'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import Registration from './pages/Registration/Registration'
import PagesRoutes from './constants/router-types'
import MainPage from './pages/MainPage/MainPage'

import AnotherUser from './pages/Profile/AnotherUser/AnotherUser'
import NotFound from './pages/NotFound/NotFound'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from './redux/hooks/redux-hooks'
import { fetchUser } from './redux/slices/userSlice/userSlice/thunk/setFetchUser'
import PostModal from './pages/Profile/Modals/PostModal/PostModal'
import { useLocation } from 'react-router-dom'
import Profile from './pages/Profile/Profile'
import FollowersModal from './pages/Profile/Modals/FollowersModal/FollowersModal'
import FollowingModal from './pages/Profile/Modals/FollowingModal/FollowingModal'


const App = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch()

  const postId = useAppSelector(id => id.user.user.posts)

  const [visible, setVisible] = useState(false)


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchUser(user.uid))
      }
    })
  }, [])
  const location = useLocation();
  const background = location.state && location.state.background;

  return (


    <div>
      <Routes location={background || location}>
        <Route path={PagesRoutes.SIGN_IN} element={<Login />} />
        <Route path={PagesRoutes.SIGN_UP} element={<Registration />} />
        <Route path={PagesRoutes.MAIN} element={<MainPage />}>
          <Route path={`/p/:postId`} element={<PostModal />} />
          <Route path={`/:uid/followers/`} element={<FollowersModal/>} />
          <Route path={`/:uid/following/`} element={<FollowingModal/>} />
        </Route>
        <Route path={`/:uid/`} element={<Profile />} />
        <Route path={`/:uid/`} element={<AnotherUser />} />
        <Route path='*' element={<NotFound />} />
      </Routes> 
      {background && <Routes>
        <Route path={`/p/:postId`} element={<PostModal />} />
        <Route path={`/:uid/followers/`} element={<FollowersModal/>} />
        <Route path={`/:uid/following/`} element={<FollowingModal/>} />
      </Routes>}
 
    </div>
  )
}

export default App