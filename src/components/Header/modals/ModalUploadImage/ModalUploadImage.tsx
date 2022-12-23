import React from 'react'

import { useAppSelector, useAppDispatch } from '../../../../redux/hooks/redux-hooks';
import { setUser } from '../../../../redux/slices/userSlice/userSlice/userSlice';
import { RootState } from '../../../../redux/store/store';
import { uploadPhoto } from '../../../../redux/slices/userSlice/userSlice/userSlice';
import { uploadProfileImage } from '../../../../redux/slices/userSlice/userSlice/thunk/uploadProfileImage';
import { nanoid } from 'nanoid';
interface IProps {

  setVisible: (value: boolean | ((prevVisible: boolean) => boolean)) => void;


}

const ModalUploadImage = ({ setVisible }: IProps) => {
  const currentUser = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()

  const ImageSelectedHandler =  async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) {
      return
    }

    const selectedImage = event.target.files[0]


    dispatch(await uploadProfileImage({ image: selectedImage }))
    setVisible(false)

  }





  return (
    <div className=' px-8 flex-col items-center text-center rounded-xl '>
      <h1 className='font-bold p-8  px-16 cursor-pointer'>Change profile photo</h1>
      <hr className='mb-4 ' />
      <label className=' font-bold text-blue-400 cursor-pointer w-36' >Upload photo
        <input type="file" className='hidden  ' onChange={(e) => ImageSelectedHandler(e)} accept="image/png, image/gif, image/jpeg" />
      </label>
      <hr className='mb-4 ' />
      <h1 className='p-2  font-bold text-red-400 cursor-pointer '>Remove Current Photo</h1>
      <hr className='mb-4 ' />
      <h1 onClick={() => setVisible(false)} className='p-4 cursor-pointer'>Cancel</h1>
    </div>
  )
}

export default ModalUploadImage