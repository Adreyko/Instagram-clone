import React, { useRef, useEffect } from 'react'
import { useAppSelector } from '../../../redux/hooks/redux-hooks'
import { uuidv4 } from '@firebase/util'
import { Link, useParams } from 'react-router-dom'





const Message = ({ message }: any) => {
    const signedUser = useAppSelector(user => user.user.user)
    const chatUserImage = useAppSelector(user => user.chat.chat.profileImage)
    const anotherUid = useAppSelector(user => user.chat.chat.uid)


    const { chatId } = useParams()


    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref.current?.scrollIntoView({ block: 'end' })
    }, [message])


    useEffect(() => {
        ref.current?.scrollIntoView({ block: 'end' })
    },[])
    //  let removeQuotes = message?.heart?.replace(/^"(.*)"$/, '$1');

    //  <Link to={`/${uid}/`}><img className='border-[1px] rounded-full h-12 w-12' alt='prof' src={`${profileImage ? profileImage : '/images/profile.png'}`} /></Link>  
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
                        </div>

                    </div>

            }



        </div>

    )
}

export default Message