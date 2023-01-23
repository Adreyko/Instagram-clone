import React, { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from '../../redux/hooks/use-auth'
import { getAuth } from 'firebase/auth'
import PagesRoutes from '../../constants/router-types'

import Header from '../../components/Header/Header'

import { Navigate, } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks/redux-hooks';
import FollowingPosts from './FollowingPosts/FollowingPosts'
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../firebase/firebase'
import Recommend from './Recommend/Recommend';


const MainPage = () => {

  const { isAuth } = useAuth()
  const auth = getAuth()
  const signedUser = useAppSelector(user => user.user.user)
  const signedUserFollowing = signedUser.following
  const [user, setUser] = useState<any>()
  const [followingPosts, setFollowingPosts] = useState<any>([])

  const followingPostEl = followingPosts.map((post: { postImage: string; user: string; postId: string }) => (
    <FollowingPosts postImage={post.postImage} user={post.user} postId={post.postId} />
  ))


  // console.log(signedUserFollowing)



  let initialized = false;
  useEffect(() => {

    if (!initialized) {
      initialized = true
      if (signedUser.uid) {

        const allFollowindPostsDb = () => {
          signedUserFollowing.forEach(async (user) => {
            const docUser = doc(db, "users", user.uid);
            // console.log(user.uid)
            const docSnap = await getDoc(docUser);
            const followingUser = docSnap.data()
            console.log(followingUser?.posts)
            setFollowingPosts((prevAllPosts: any) => [...prevAllPosts, ...followingUser?.posts])
          })

        }

        allFollowindPostsDb()
      }
    }





  }, [signedUser.uid])


  console.log(signedUserFollowing)


  return auth ? (

    <div className='sm:flex bg-gray-50 '>
      <div className='w-[20%]'>
        <Header />
      </div>
      {signedUserFollowing.length === 0 ?
        <div className='w-[100%] h-[100vh] flex justify-center'>
          <Recommend />
        </div>
        :
        <div className='flex  flex-col  justify-center items-center w-[100%]'>
          {followingPostEl}
        </div>}


    </div>


  ) : (
    <Navigate to={PagesRoutes.SIGN_IN} />
  )
}

export default MainPage