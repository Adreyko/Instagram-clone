import React, { useState } from 'react'
import { IUserState } from '../../../interfaces/interfaces'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { auth } from '../../../firebase/firebase';
import PagesRoutes from '../../../constants/router-types';
import { Navigate } from 'react-router-dom';
interface ParentStateItem {


  postImage: string;
  postId: string;
  user: string;
}

interface ParentState {
  posts: ParentStateItem;
}

export const Post: React.FC<ParentStateItem> = ({ postImage, postId, user }) => {


  const [visible, setVisible] = useState(false)
  const location = useLocation()

  return auth ? (
    <div className=' bg-black'>
      <Link to={`/${user}/${postId}`} state={{ background: location }}>
        <img
          onClick={() => setVisible(true)}
          className='  h-[200px] w-[300px] 2xl:h-[300px] object-cover hover:opacity-60 cursor-pointer'
          src={postImage}
          alt="post" />
      </Link>


    </div>
  )
    : (
      <Navigate to={PagesRoutes.SIGN_IN} />
    )
}
