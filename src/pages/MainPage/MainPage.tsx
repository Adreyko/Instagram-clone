import React,{useState} from 'react'

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../redux/hooks/use-auth'
import PagesRoutes from '../../constants/router-types'

import Header from '../../components/Header/Header'
import ReusableModal from '../../components/Header/modals/ReusableModal'
import ModalLogin from '../../components/Header/modals/ModalLogin/ModalLogin'




const MainPage =  () => {
  const [visible,setVisible] = useState(true)
  const { isAuth } = useAuth()

  return isAuth ? (

    <div className='flex justify-round bg-gray-100 '>
      <Header />
      <h1 className=' bg-white h-4 rounded-md p-6 flex justify-center items-center mt-8'>Stories</h1>
    </div>
  ) : (
    // <Navigate to={PagesRoutes.SIGN_IN} />
    <ReusableModal visible={visible} setVisible={setVisible}>
      <ModalLogin/>
    </ReusableModal>

   
  )
}

export default MainPage