import React from 'react'
import Login from './pages/Login/Login'
import { Routes, Route, Link } from 'react-router-dom'
import Registration from './pages/Registration/Registration'



const App = () => {
  return (
    <div className=''>
     

      <Routes>
      <Route path='/login' element={<Login/>} />
       <Route path='/registration' element={<Registration/>} />
      </Routes>
    </div>
  )
}

export default App