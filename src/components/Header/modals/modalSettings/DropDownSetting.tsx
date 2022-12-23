import React from 'react'
import { Dispatch, SetStateAction } from "react";
import { removeUser } from '../../../../redux/slices/userSlice/userSlice/userSlice';
import { useDispatch } from 'react-redux';

interface IProps {

  setShowSettings: Dispatch<SetStateAction<boolean>>;


}
const DropDownSetting = ({ setShowSettings }: IProps) => {
  const dispatch = useDispatch()
  
  return (

    <div className='shadow-2xl p-4 absolute bottom-20 left-4 rounded-md bg-white  ' onClick={() => setShowSettings(false)}>
      <ul className='z-20' onClick={e => e.stopPropagation()}>
        <li className='flex justify-between p-2 text-base  border-b-[1px] cursor-pointer border-black '><h1 className='mr-10 '>Settings</h1><i className="ri-settings-2-line text-2xl"></i></li>
        <li className='flex justify-between p-2 text-base border-b-[1px] cursor-pointer border-black'><h1 className='mr-10'> Saved</h1><i className="ri-settings-2-line text-2xl"></i></li>
        <li className='flex justify-between p-2 text-base border-b-[1px] cursor-pointer border-black'><h1 className='mr-10'>Your activity</h1><i className="ri-settings-2-line text-2xl"></i> </li>
        <li className='flex justify-between p-2 text-base border-b-[1px] cursor-pointer border-black'><h1 className='mr-10'>Switch appearance</h1><i className="ri-settings-2-line text-2xl"></i></li>
        <li onClick={() => dispatch(removeUser())} className='flex justify-between p-2 text-base cursor-pointer '><h1 className='mr-10'>Log out</h1></li>
      </ul>
    </div>
  )
}

export default DropDownSetting