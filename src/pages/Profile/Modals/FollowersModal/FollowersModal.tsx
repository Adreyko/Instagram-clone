import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../redux/hooks/redux-hooks'
import FollowersListComponent from './FollowersList/FollowersListComponent'
import { useParams } from 'react-router-dom'

import { db } from '../../../../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'


interface IProps {
  visible: boolean;
  setVisible: (value: boolean | ((prevVisible: boolean) => boolean)) => void;
  children: React.ReactNode,


}


const FollowersModal = () => {

  const { uid } = useParams()
  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()
  const signedUserFollowers = useAppSelector(post => post.user.user.followers)
  const signedUser = useAppSelector(user => user.user.user)
  const anotherUserFollowers = useAppSelector(user => user.anotherUser.user.followers)
  const [user, setUser] = useState<any>()

  const fetchData = async () => {
    const docRef = doc(db, "users", uid as string)
    const docSnap = await getDoc(docRef);
    setUser(docSnap.data())
  }


  const userFollowers = user?.followers

console.log(userFollowers)
  useEffect(() => {
    fetchData()
  },[])

  
  const followersElement = userFollowers?.map((el: { uid: string; userName: string; fullName: string; profileImage: string }) => (
    <FollowersListComponent uid={el.uid} userName={el.userName} fullName={el.fullName} profileImage={el.profileImage} />
  ))






  if (!visible) return null
  return (
    <div className='fixed inset-0 z-10   bg-opacity-30 backdrop-blur-sm flex justify-center items-center bg-gray-500   ' onClick={() => navigate(-1)} >
      <div onClick={e => e.stopPropagation()} className='  rounded shadow-sm z-20 xl:w-[20%] sm:w-[40%]   flex items-center w-[60%] '>


        <div className='bg-white w-[100%]   flex-col rounded-xl'>
          <div className='text-center'>
            <h1 className='border-b-[1px] py-2'>Followers</h1>
          </div>


          <div>
            {userFollowers?.length > 0 ? <div className='m-2'>
              {followersElement}
            </div>
              :
              <div className='flex flex-col justify-center items-center p-[10%] py-[20%] text-center'>
                <img className='w-16' src="/images/profile.png" alt="" />
                <h1 className='text-[25px]'>Followers</h1>
                <p className='text-[13px]'>You'll see all the people who follow you here.</p>
              </div>}
          </div>
        </div>

      </div>
    </div>
  )
}

export default FollowersModal