import React,{useState} from 'react'

import { useAuth } from '../../redux/hooks/use-auth'
import { getAuth } from 'firebase/auth'
import PagesRoutes from '../../constants/router-types'

import Header from '../../components/Header/Header'

import { Navigate, } from 'react-router-dom'




const MainPage =  () => {
  
  const { isAuth } = useAuth()
  const auth = getAuth()


  return auth ? (

    <div className='flex justify-round bg-gray-100 '>
      <Header />
      <h1 className=' bg-white h-4 rounded-md p-6 flex justify-center items-center mt-8'>Stories</h1>
    </div>
  ) : (
    <Navigate to={PagesRoutes.SIGN_IN} /> 
  )
}

export default MainPage