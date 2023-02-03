import { memo, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useAppSelector } from '../../../redux/hooks/redux-hooks'
import { Link, Navigate } from 'react-router-dom'
import PagesRoutes from '../../../constants/router-types'
import ReusableModal from '../../../components/Header/modals/ReusableModal'
import ModalUploadImage from './Modals/ModalUploadImage/ModalUploadImage'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Posts } from '../Posts/Posts'
import SavedPosts from './SavedPosts/SavedPosts'
import { HashLink } from 'react-router-hash-link'
import { useNavigate } from 'react-router-dom'

const SignedUser = () => {


    const auth = getAuth()
    const user = useAppSelector(user => user.user.user)
    const [visible, setVisible] = useState(false)
    const { uid } = useParams()
    const [showSavedPosts, setShowSavedPosts] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const { userName, profileImage, followers, posts, following, fullName } = useAppSelector(state => state.user.user)


    const openSaved = () => {
        setShowSavedPosts(false)
        window.history.replaceState({}, `saved`, `/${uid}`);
    }

    return auth ? (

        <div className='sm:flex bg-gray-50 w-[100%] sm:w-[90%] md:w-[80%]   '>
            <div className='   w-[100%] p-4  xl:mx-[20%]  '>
                <div className='flex  justify-center '>
                    <div className='w-[30%] flex justify-center '>
                        <img onClick={() => setVisible(true)} className='rounded-full object-cover  w-[100px] h-[100px]  sm:h-40 sm:w-40    cursor-pointer border-[1px]' src={profileImage ? profileImage : process.env.PUBLIC_URL +`/images/profile.png`} alt="" />
                    </div>
                    <ReusableModal visible={visible} setVisible={setVisible}>
                        <ModalUploadImage setVisible={setVisible} />
                    </ReusableModal>
                   
                        <div className='w-[70%]'>
                            <div className='sm:flex-row justify-between w-[50%] sm:w-[100%]  flex flex-col  text-center  '>
                                <h1 className='text-2xl font-[300]'>{userName}</h1>
                            </div>
                            <div className='flex  mt-4 mr-12 '>
                                <h1 className='mr-8'>{posts.length} posts</h1>
                                <Link
                                    to={`/${uid}/followers`}
                                    state={{ background: location }}>
                                    <h1 className='mr-8 cursor-pointer'>{followers.length} followers</h1>
                                </Link>
                                <Link
                                    to={`/${uid}/following`}
                                    state={{ background: location }}>
                                    <h1 className='mr-8 cursor-pointer'>{following.length} following</h1>
                                </Link>
                            </div>
                            <div className='flex flex-col mt-4 mr-[275px]'>
                                <h1 className='font-bold'>{fullName}</h1>
                                <p>About me</p>
                            </div>
                        </div>
                    
                </div>
                <div>
                    <div className='mt-12 border-t-2 flex justify-center'>
                        <button onClick={() => openSaved()} className={` ${!showSavedPosts ? 'border-t-[1px] border-black' : ''} pt-4 mr-10 border-black text-[15px] flex items-center`}><i className="ri-grid-line mr-1"></i>POSTS</button>
                        <HashLink to='#saved'>
                            <button
                                onClick={() => setShowSavedPosts(true)}
                                className={` ${showSavedPosts ? 'border-t-[1px] border-black' : ''} pt-4  border-black text-[15px] flex items-center`}>
                                <i className="ri-bookmark-line  mr-1"></i>SAVED
                            </button>
                        </HashLink>
                        <button className='ml-10 pt-4 text-[15px] flex items-center'><i className="ri-price-tag-3-line mr-1"></i>TAGGED</button>
                    </div>
                    <div className='p-2'>

                        {showSavedPosts ?
                            <SavedPosts />
                            :
                            < Posts />}


                    </div>
                </div>
            </div>
        </div>


    ) : (
        <Navigate to={PagesRoutes.SIGN_IN} />
    )
}

export default memo(SignedUser) 