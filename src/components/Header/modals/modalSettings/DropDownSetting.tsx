import React, { useEffect, useState } from 'react'
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from 'react-redux';
import { auth } from '../../../../firebase/firebase';
import { signOut } from 'firebase/auth'
import { removeUser } from '../../../../redux/slices/userSlice/userSlice/userSlice';
import { useAppDispatch } from '../../../../redux/hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import PagesRoutes from '../../../../constants/router-types';
import ReusableModal from '../ReusableModal';
import ModalLogin from '../ModalLogin/ModalLogin';



interface IProps {
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}


const DropDownSetting = ({ setShowSettings }: IProps) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(3)


  const modalApper = () => {

    setVisible(true)
  }




  const handleLogOut  = async () => {
    await signOut(auth)
    dispatch(removeUser())
    navigate(PagesRoutes.SIGN_IN)
  }





  return (

    <div className='shadow-2xl p-4 absolute bottom-20 left-4 rounded-md bg-white  ' onClick={() => setShowSettings(false)}>
      <ul className='z-20' onClick={e => e.stopPropagation()}>
        <li className='flex justify-between p-2 text-base  border-b-[1px] cursor-pointer border-black '><h1 className='mr-10 '>Settings</h1><i className="ri-settings-2-line text-2xl"></i></li>
        <li className='flex justify-between p-2 text-base border-b-[1px] cursor-pointer border-black'><h1 className='mr-10'> Saved</h1><i className="ri-settings-2-line text-2xl"></i></li>
        <li className='flex justify-between p-2 text-base border-b-[1px] cursor-pointer border-black'><h1 className='mr-10'>Your activity</h1><i className="ri-settings-2-line text-2xl"></i> </li>
        <li className='flex justify-between p-2 text-base border-b-[1px] cursor-pointer border-black'><h1 className='mr-10'>Switch appearance</h1><i className="ri-settings-2-line text-2xl"></i></li>
        <li onClick={handleLogOut} className='flex justify-between p-2 text-base cursor-pointer '><h1 className='mr-10'>Log out</h1></li>
      </ul>
      <ReusableModal visible={visible} setVisible={setVisible}>
        <ModalLogin />
      </ReusableModal>

    </div>
  )
}

export default DropDownSetting