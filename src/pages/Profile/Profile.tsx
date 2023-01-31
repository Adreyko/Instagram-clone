import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SignedUser from './SignedUserProfile/SignedUser'
import AnotherUser from './AnotherUser/AnotherUser'
import { useAppSelector } from '../../redux/hooks/redux-hooks'
import NotFound from '../NotFound/NotFound'
import { useAppDispatch } from '../../redux/hooks/redux-hooks'
import { fetchAnotherUser } from '../../redux/slices/userSlice/anotherUserSlice/tnunk/setFetchAnotherUser'
import Header from '../../components/Header/Header'



const Profile = () => {
  const { uid } = useParams()
  const signedUser = useAppSelector(user => user.user.user)
  const anotherUser = useAppSelector(user => user.anotherUser.user)
  const dispatch = useAppDispatch()
  const [loading, SetLoading] = useState(false)
 

  useEffect(() => {

    if (signedUser.uid !== uid) {
      dispatch(fetchAnotherUser(uid as string))
    }


  }, [uid])

  // useEffect(() => {

  //   SetLoading(true)


  //   setTimeout(() => {
  //     SetLoading(false)
  //   }, 100)

  // }, [])



  return signedUser.uid === uid ? (
    <div>
      
      <div className='bg-gray-50  flex justify-between'>

        <div className='bg-gray-50 h-[100vh]'>
          <Header />
        </div>
        <SignedUser />

      </div>
    </div>


  )
    :
    (
      <>
        {
          anotherUser.uid === uid ?
            <div className='bg-gray-50  flex justify-between'>
              <div >
                <Header />
              </div>
              <AnotherUser />
            </div>
            :
            <NotFound />}
      </>

    )
}

export default Profile