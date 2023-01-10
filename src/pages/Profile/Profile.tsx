import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SignedUser from './SignedUserProfile/SignedUser'
import AnotherUser from './AnotherUser/AnotherUser'
import { useAppSelector } from '../../redux/hooks/redux-hooks'
import NotFound from '../NotFound/NotFound'
import { useAppDispatch } from '../../redux/hooks/redux-hooks'
import { fetchAnotherUser } from '../../redux/slices/userSlice/anotherUserSlice/tnunk/setFetchAnotherUser'


const Profile = () => {
    const {uid } = useParams()
    const signedUser = useAppSelector(user=> user.user.user)
    const anotherUser = useAppSelector(user=>user.anotherUser.user)
    const dispatch = useAppDispatch()
    

    useEffect(() => {
      if(signedUser.uid !== uid){
          dispatch(fetchAnotherUser(uid as string))
      }
      
  }, [uid])
  return signedUser.uid === uid ? (
    <SignedUser/>
  )
  :
  (
    <>
      { anotherUser.uid === uid ? <AnotherUser/> : <NotFound/>  }  
    </>
    
  )
}

export default Profile