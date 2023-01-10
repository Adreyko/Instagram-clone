import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

import { auth } from '../../../firebase/firebase';
import { Navigate } from 'react-router-dom';
import PagesRoutes from '../../../constants/router-types';


import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from '../../../redux/hooks/redux-hooks';
import { fetchUser } from '../../../redux/slices/userSlice/userSlice/thunk/setFetchUser';


interface ParentStateItem {

  user: string;
  postId: string;
  postImage: string;
  likes: number[];
  comments: string[]

}

interface ParentState {
  posts: ParentStateItem;
}

const UserPosts: React.FC<ParentStateItem> = ({ postImage, postId,user }) => {
const dispatch = useAppDispatch()

  const location = useLocation()

  const [visible, setVisible] = useState(false)


  return auth ? (
    <div className='bg-black '>
      <Link to={`/p/${postId}`} state={{ background: location }}>
        <img
          onClick={() => setVisible(true)}
          className=' h-[200px] w-[300px] 2xl:h-[300px] object-cover hover:opacity-60 cursor-pointer'
          src={postImage}
          alt="post" />
      </Link>


    </div>
  )
  : (
    <Navigate to={PagesRoutes.SIGN_IN} />
)
}


export default UserPosts