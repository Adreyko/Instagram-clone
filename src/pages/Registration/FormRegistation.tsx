import React, { useCallback, useState, ChangeEvent } from 'react'
import { Link, } from 'react-router-dom'
import PagesRoutes from '../../constants/router-types'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { fetchUser } from '../../redux/slices/userSlice/userSlice/thunk/setFetchUser'






const FormRegistration: React.FC = () => {

    const [fullName, setFullName] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const isInvalid = userName.length > 3 && fullName.length > 3 && password.length > 7 && email.length > 1

    const handleUserName = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    }

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value)
    }
    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleRegister = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        event.preventDefault()

        const auth = getAuth()
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            const docUser =
            {
                email: user.user.email,
                uid: user.user.uid,
                fullName: fullName,
                userName: userName,
                following: [],
                followers: [],
                dateCreated: new Date().getTime(),
                birthdate: "",
                phoneNumber: "",
                profileImage: "",
                posts: [],
                savedPosts: [],
            }

            await setDoc(doc(db, "users", user.user.uid), docUser)
            dispatch(setUser(docUser))
            
        }
        catch (error: any) {
            setEmail('');
            setPassword('');
            setError(error.message);
            console.log(error);
        }
        navigate(PagesRoutes.SIGN_IN)
    }

    return (
        <>

            <form className='py-20 flex justify-center items-center  bg-gray-100 h-[100vh]' >
                <div>
                    <div className='border-[1px] w-[300px] bg-white mb-4 py-8'>
                        <div>
                            <h1 className='font-pacifico text-4xl mt-4 mb-8 py-4 flex justify-center items-center'>Instagram</h1>
                        </div>
                        <div>
                            <div className='flex justify-center items-center '>
                                <input
                                    placeholder='Username'
                                    type="text"
                                    name="username"
                                    value={userName}
                                    onChange={handleUserName}
                                    className='border-[1px] w-[90%] h-[40px] px-4 rounded-md mb-4' />

                            </div>
                        </div>
                        <div className='flex justify-center items-center '>
                            <input
                                placeholder='Name'
                                type="text"
                                name="name"
                                value={fullName}
                                onChange={handleName}
                                className='border-[1px] w-[90%] h-[40px] px-4 rounded-md mb-4' />
                        </div>
                        <div className='flex justify-center items-center '>
                            <input
                                placeholder='Email address'
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleEmail}
                                className='border-[1px] w-[90%] h-[40px] px-4 rounded-md mb-4' />

                        </div>
                        <div className='flex justify-center items-center '>
                            <input
                                placeholder='Password'
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePassword}
                                className='border-[1px] w-[90%] h-[40px] px-4 rounded-md mb-4' />
                        </div>
                        <div className='flex justify-center items-center mt-2 '>
                            <button
                                disabled={!isInvalid}
                                onClick={handleRegister}
                                type='submit'
                                className='border-[1px] rounded-md w-[90%] h-[40px] px-2 bg-blue-500 text-white disabled:bg-blue-400'>Sign Up</button>
                        </div>
                    </div>
                    <div className=' bg-white border-[1px]  flex-row justify-center items-center   w-[300px]'>
                        <h1 className='flex items-center justify-center py-2'>Already have an account?<Link className='font-bold ml-1' to={PagesRoutes.SIGN_IN}>Sign In</Link> </h1>
                    </div >
                </div>
            </form>

        </>
    )
}

export default FormRegistration