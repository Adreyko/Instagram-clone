import React, { useRef, useEffect, memo } from 'react'
import { useAppSelector } from '../../../redux/hooks/redux-hooks'
import { uuidv4 } from '@firebase/util'
import { Link, useLocation, useParams } from 'react-router-dom'





const Message = ({ message, postMessage }: any) => {
    const signedUser = useAppSelector(user => user.user.user)
    const chatUserImage = useAppSelector(user => user.chat.chat.profileImage)
    const anotherUid = useAppSelector(user => user.chat.chat.uid)
    const location = useLocation()

    const { chatId } = useParams()


    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref.current?.scrollIntoView({ block: 'end' })
    }, [message])


    useEffect(() => {
        ref.current?.scrollIntoView({ block: 'end' })
    }, [])




    console.log(message.post)
    return (
        <div ref={ref}>

            {
                message.senderId === signedUser.uid ?
                    <div className='flex justify-end mt-2 mb-4'>
                        {message.message ? <div className='  items-center '>
                            <h1 className=' p-2 rounded-3xl bg-gray-200'>{message.message}</h1>
                        </div> : ''}
                        {message.image ? <div className=''>
                            <img src={`${message.image}`} className=' rounded-3xl w-[200px] h-[200px]' alt="" />
                        </div> : ''}
                        {message.heart ? <i className="ri-heart-fill text-red-500 text-4xl"></i> : ''}
                        {message.post ?
                            <div className='bg-gray-200 my-10 py-2 rounded-3xl w-[200px] h-[300px]'>
                                <Link to={`/${message.post[0]}/`}> <div className='flex p-4'>
                                    <img className='h-6 w-6 rounded-3xl mr-2 ' src={message.post[3]} alt="" />
                                    <h1 className='text-[1rem]'>{message.post[4]}</h1>
                                </div>
                                </Link>
                                <Link to={`/${message.post[0]}/${message.post[2]}`} state={{ background: location }}>
                                    <img className='w-full h-full  rounded-b-3xl object-cover' src={message.post[1]} alt="s" />
                                </Link>
                            </div> : ''}
                    </div>
                    :
                    <div className='flex '>
                        <Link to={`/${anotherUid}/`}> <img className='mt-8 w-8 h-8 flex  cursor-pointer rounded-2xl justify-end' src={chatUserImage} alt='dsada' /></Link>
                        <div className='flex justify-start mt-2 mb-4'>
                            {message.message ? <div className='  items-center '>
                                <h1 className=' border-[1px] p-2 rounded-3xl'>{message.message}</h1>
                            </div> : ''}
                            {message.image ? <div className=''>
                                <img src={`${message.image}`} className=' rounded-3xl w-[200px] h-[200px]' alt="" />
                            </div> : ''}
                            {message.heart ? <i className="ri-heart-fill text-red-500 text-4xl"></i> : ''}
                            {message.post ?
                            <div className='bg-gray-200 my-10 py-2 rounded-3xl w-[200px] h-[300px]'>
                                <Link to={`/${message.post[0]}/`}> <div className='flex p-4'>
                                    <img className='h-6 w-6 rounded-3xl mr-2 ' src={message.post[3] ? message.post[3] : process.env.PUBLIC_URL +`/images/profile.png`} alt="" />
                                    <h1>{message.post[4]} </h1>
                                </div>
                                </Link>
                                <Link  to={`/${message.post[0]}/${message.post[2]}`} state={{ background: location }}>
                                    <img className='w-full h-full  rounded-b-3xl object-cover' src={message.post[1]} alt="s" />
                                </Link>
                            </div> : ''}
                        </div>

                    </div>

            }



        </div>

    )
}

export default memo(Message)