import React, { useRef,useEffect } from 'react'
import { useAppSelector } from '../../../redux/hooks/redux-hooks'
import { uuidv4 } from '@firebase/util'






const Message = ({ message }: any) => {
    const signedUser = useAppSelector(user => user.user.user)
    const chatUserImage = useAppSelector(user => user.chat.chat.profileImage)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:'smooth'})
    },[message])


    
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
                    </div>
                    :
                    <div className='flex '>
                        <img className='mt-8 w-8 h-8 flex  rounded-2xl justify-end' src={chatUserImage} alt='dsada' />
                        <div className='flex justify-start mt-2 mb-4'>
                            {message.message ? <div className='  items-center '>
                                <h1 className=' border-[1px] p-2 rounded-3xl'>{message.message}</h1>
                            </div> : ''}
                            {message.image ? <div className=''>
                                <img src={`${message.image}`} className=' rounded-3xl w-[200px] h-[200px]' alt="" />
                            </div> : ''}
                        </div>

                    </div>

            }



        </div>

    )
}

export default Message