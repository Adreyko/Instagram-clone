import React, { Dispatch, SetStateAction, useState, useEffect, memo } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import SearchedUser from './SearchedUser/SearchedUser';



interface IProps {
  modalWidth: number;
  setModalWidth: Dispatch<SetStateAction<number>>;
}

const Search = ({modalWidth,setModalWidth } : IProps) => {


  const [allUsers, setAllUsers] = useState<any>()
  const [userNameInput, setUserNameInput] = useState<any>()



  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

    setUserNameInput(event.currentTarget.value)

  }

  let initialized = false;

  const fetchData = async () => {
    setAllUsers([])
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {


      setAllUsers((prev: any) => [...prev, { ...doc.data() }],)
    })
  }


  const searchedUser = allUsers?.filter((user: any) => {
    if (userNameInput === "") {
      return ''
    } else if (user?.userName?.toLowerCase().includes(userNameInput?.toLowerCase())) {
      return user
    }
  })


  useEffect(() => {
    if (!initialized) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      initialized = true
      fetchData()
    }
  }, [])


  const searchedUserEl = searchedUser?.map((user: any) => (
    <SearchedUser uid={user.uid} userName={user.userName} fullName={user.fullName} profileImage={user.profileImage} />
  ))


 
  return (


    
      <div className={`w-[100%]  ${modalWidth === 0 ? 'hidden' : 'block'}  `}>
        <div className={`flex p-4 py-4 items-center `}>
          <h1 className='font-bold flex items-center text-2xl'>Search</h1>
        </div>
        <div className='py-4 px-2 border-b-[1px]'>
          <input onChange={(e) => inputHandler(e)} value={userNameInput} placeholder=' Search'  type="search" className=' outline-none bg-gray-100 px-4 py-2 w-[100%]   rounded-xl' />
        </div>
        <div className='font-bold text-[1rem] p-4'>
          <h1>Recent</h1>
  
        </div>
        {searchedUserEl}
      </div>
    

    
  )
}   

export default memo(Search)