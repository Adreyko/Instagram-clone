import React, { useEffect, useState } from 'react'
import Login from './pages/Login/Login'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import Registration from './pages/Registration/Registration'
import PagesRoutes from './constants/router-types'
import MainPage from './pages/MainPage/MainPage'
import Profile from './pages/Profile/SignedUserProfile/Profile'
import AnotherUser from './pages/Profile/AnotherUser/AnotherUser'
import NotFound from './pages/NotFound/NotFound'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from './redux/slices/userSlice/userSlice/userSlice'
import { removeUser } from './redux/slices/userSlice/userSlice/userSlice'
import { auth } from './firebase/firebase'
import { useAppDispatch, useAppSelector } from './redux/hooks/redux-hooks'
import { fetchUser } from './redux/slices/userSlice/userSlice/thunk/setFetchUser'
import UserPosts from './pages/Profile/SignedUserProfile/UserPosts'
import PostModal from './components/Header/modals/PostModal/PostModal'
import { useLocation } from 'react-router-dom'
import ReusableModal from './components/Header/modals/ReusableModal'

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
        </Route>
        <Route path={`${PagesRoutes.PROFILE}/:uid`} element={<Profile />} />
        <Route path={`${PagesRoutes.ANOTHER_USER}/:uid`} element={<AnotherUser />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {background && <Routes>
        <Route path={`/p/:postId`} element={<PostModal />} />
      </Routes>}
    </div>
  )
}

export default App