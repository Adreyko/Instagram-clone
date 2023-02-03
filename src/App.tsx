import React, { useEffect, Suspense, lazy, useState } from 'react'
import Login from './pages/Login/Login'
import { Routes, Route, } from 'react-router-dom'
import PagesRoutes from './constants/router-types'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from './redux/hooks/redux-hooks'
import { fetchUser } from './redux/slices/userSlice/userSlice/thunk/setFetchUser'
import { useLocation } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';

const Registration = lazy(() => import('./pages/Registration/Registration'))
const MainPage = lazy(() => import('./pages/Dashboard/Dashboard'))
const AnotherUser = lazy(() => import('./pages/Profile/AnotherUser/AnotherUser'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const PostModal = lazy(() => import('./pages/Profile/Posts/PostModal/PostModal'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const FollowersModal = lazy(() => import('./pages/Profile/Modals/FollowersModal/FollowersModal'))
const FollowingModal = lazy(() => import('./pages/Profile/Modals/FollowingModal/FollowingModal'))
const Explore = lazy(() => import('./pages/Explore/Explore'))
const Direct = lazy(() => import('./pages/Direct/Direct'))


const App = () => {
  const [progress, setProgress] = useState(100)
  const auth = getAuth();
  const dispatch = useAppDispatch()

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
  {progress === 100  ? 
  <LoadingBar 
  color='#FF8000'
  progress={progress}
  onLoaderFinished={() => setProgress(0)}
  waitingTime={200}
  height={3} />
  :
    <Suspense fallback={<LoadingBar />}>
      <Routes location={background || location}>
        <Route path={PagesRoutes.SIGN_IN} element={<Login />} />
        <Route path={PagesRoutes.SIGN_UP} element={<Registration />} />
        <Route path="/direct" element={<Direct />} />
        <Route path={PagesRoutes.MAIN} element={<MainPage />}>
          <Route path={`/:uid/:postId`} element={<PostModal />} />
          <Route path={`/:uid/followers/`} element={<FollowersModal />} />
          <Route path={`/:uid/following/`} element={<FollowingModal />} />
        </Route>
        <Route path={'/explore/'} element={<Explore />} />
        <Route path={`/:uid/`} element={<Profile />} />
        <Route path={`/:uid/`} element={<AnotherUser />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      {background && <Routes>
        <Route path={`/:uid/:postId`} element={<PostModal />} />
        <Route path={`/:uid/followers/`} element={<FollowersModal />} />
        <Route path={`/:uid/following/`} element={<FollowingModal />} />
      </Routes>}

    </Suspense>

    }
    </div>
  )
}

export default App