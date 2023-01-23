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
    <div className=' bg-black flex items-center justify-center mt-9 w-[90%] m-auto '>
      <Link to={`/${user}/${postId}`} state={{ background: location }}>
        <div className=' bg-black w-full sm:h-[250px] h-[100px] flex items-center justify-center '>
          <img          
            onClick={() => setVisible(true)}
            className='hover:opacity-50 h-full w-full object-cover  '
            src={postImage}
            alt="post" />
        </div>
      </Link>


    </div>
  )
    : (
      <Navigate to={PagesRoutes.SIGN_IN} />
    )
}
