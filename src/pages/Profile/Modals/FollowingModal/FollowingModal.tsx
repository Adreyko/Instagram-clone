import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../redux/hooks/redux-hooks'
import AnotherFollowingList from '../../AnotherUser/Modals/AnotherFollowingList'
import FollowingList from '../../SignedUserProfile/Modals/FollowingList/FollowingList'
import { useParams } from 'react-router-dom'






const FollowingModal = () => {


  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()
  const signedUserFollowing = useAppSelector(post => post.user.user.following)
  const anotherUserFollowing = useAppSelector(user => user.anotherUser.user.following)
  const signedUser = useAppSelector(user => user.user.user)
  const { uid } = useParams()






  const followingElement = signedUserFollowing.map(el => (
    <FollowingList uid={el.uid} userName={el.userName} fullName={el.fullName} profileImage={el.profileImage} />
  ))

  const anotherFollowingElement = anotherUserFollowing.map(el => (
    <AnotherFollowingList uid={el.uid} userName={el.userName} fullName={el.fullName} profileImage={el.profileImage} />
  ))






  if (!visible) return null
  return (
    <div className='fixed inset-0 z-10   bg-opacity-30 backdrop-blur-sm flex justify-center items-center bg-gray-500   ' onClick={() => navigate(-1)} >
      <div onClick={e => e.stopPropagation()} className='  rounded shadow-sm z-20 xl:w-[20%] sm:w-[40%]   flex items-center w-[60%]  '>
        <div className='bg-white w-[100%] flex-col rounded-xl'>
          <div className='text-center'>
            <h1 className='border-b-[1px] py-2'>Followers</h1>
          </div>
          {signedUser.uid === uid ?

            <div>
              {signedUserFollowing.length > 0 ? <div className='m-2'>
                {followingElement}
              </div>
                :
                <div className='flex flex-col justify-center items-center p-[10%] py-[20%] text-center'>
                  <img className='w-16' src="/images/profile.png" alt="" />
                  <h1 className='text-[25px]'>Followers</h1>
                  <p className='text-[13px]'>You'll see all the people who follow you here.</p>
                </div>}
            </div>

            :
            <div>

              {anotherUserFollowing.length > 0 ? <div className='m-2'>  {anotherFollowingElement}</div>
                :
                <div className='flex flex-col justify-center items-center p-[10%] py-[20%] text-center'>
                  <img className='w-16' src="/images/profile.png" alt="" />
                  <h1 className='text-[25px]'>Followers</h1>
                  <p className='text-[13px]'>You'll see all the people who follow you here.</p>
                </div>}



            </div>}
        </div>
      </div>
    </div>
  )
}

export default FollowingModal