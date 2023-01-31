import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { auth } from '../../../../firebase/firebase';
import { IPost } from '../../../../interfaces/interfaces';
import { Navigate } from 'react-router-dom';
import PagesRoutes from '../../../../constants/router-types';



export const SavedPost: React.FC<IPost> = ({ postImage, postId, user }) => {



  const location = useLocation()

  return auth ? (
    <div className=' bg-black flex items-center justify-center mt-9 w-[90%] m-auto '>
      <Link to={`/${user}/${postId}`} state={{ background: location }}>
        <div className=' bg-black w-full sm:h-[250px] h-[100px] flex items-center justify-center '>
          <img          
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
