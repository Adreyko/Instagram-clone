import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PagesRoutes from '../../constants/router-types'
import { setUser } from '../../redux/slices/userSlice/userSlice/userSlice'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Login from './Login'
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/slices/userSlice/userSlice/thunk/setFetchUser'
import { useAppDispatch } from '../../redux/hooks/redux-hooks'




const FormLogin: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string>("");
    const isValid = password.length > 6


    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        event.preventDefault()

        const auth = getAuth()
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)  
            await dispatch(fetchUser(user.user.uid))
        }
        catch (error: any) {
            setEmail('');
            setPassword('');
            setError(error.message);
            console.log(error);
        }
        navigate(PagesRoutes.MAIN)

    }

    return (
        <>
            <form className='flex  py-16 justify-center items-center bg-gray-100 h-[100vh] '>
                <img className='' alt='instapresent' src='./images/instalogin.png' />
                <div>
                    <div className=' bg-white border-[1px] mr-48 flex-row justify-center items-center h-[300px] py-8 w-[300px] mb-2'>
                        <div className=' '>
                            <h1 className='font-pacifico text-4xl mt-4 mb-8 flex justify-center items-center'>Instagram</h1>
                        </div>
                        <div className='flex justify-center items   -center '>
                            <input
                                placeholder='Email address'
                                type="email"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border-[1px] w-[90%] h-[40px] px-4 rounded-md' />
                        </div>
                        <div className='flex justify-center items-center mt-2 '>
                            <input
                                placeholder='Password'
                                type="password"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border-[1px] rounded-md w-[90%] h-[40px] px-2' />
                        </div>
                        <div className='flex justify-center items-center mt-2 '>
                            <button
                                disabled={!isValid}
                                onClick={handleLogin}
                                type='submit'
                                className='border-[1px] rounded-md w-[90%] h-[40px] px-2 bg-blue-500 disabled:bg-blue-400 text-white'>Log In</button>
                        </div>

                    </div>
                    <div className=' bg-white border-[1px]  flex-row justify-center items-center   w-[300px]'>
                        <h1 className='flex items-center justify-center py-2'>Don't have an account?<Link className='font-bold ml-1' to={PagesRoutes.SIGN_UP}>Sign up</Link> </h1>
                    </div >
                </div>
            </form>

        </>
    )
}

export default FormLogin