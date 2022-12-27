import React from 'react'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks/redux-hooks';
import { uploadProfileImage } from '../../../../redux/slices/userSlice/userSlice/thunk/uploadProfileImage';

interface IProps {

  setVisible: (value: boolean | ((prevVisible: boolean) => boolean)) => void;


}

const ModalUploadImage = ({ setVisible }: IProps) => {
  const currentUser = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()

  const ImageSelectedHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) {
      return
    }

    const selectedImage = event.target.files[0]


    dispatch(await uploadProfileImage({ image: selectedImage }))
    setVisible(false)

  }





  return (
    <div className='  flex-col items-center text-center rounded-xl bg-white   '>
      <div className='border-b-[1px] p-8 flex items-center  justify-center'>
        <h1 className='font-bold  px-16 cursor-pointer'>Change profile photo</h1>
      </div>
      <div className='border-b-[1px] p-2 px-8 active:bg-gray-100 '>
        <label className=' font-bold text-blue-400 cursor-pointer w-36 0'  >Upload photo
          <input type="file" className='hidden  ' onChange={(e) => ImageSelectedHandler(e)} accept="image/png, image/gif, image/jpeg" />
        </label>
      </div>
      <div className='border-b-[1px] cursor-pointer active:bg-gray-100'>
        <h1 className='p-2  font-bold text-red-400 cursor-pointer '>Remove Current Photo</h1>
      </div>
      <div className='flex items-center justify-center  cursor-pointer active:bg-gray-100 ' onClick={() => setVisible(false)}>
        <h1 className=' cursor-pointer py-3'>Cancel</h1>
      </div>
    </div>
  )
}

export default ModalUploadImage