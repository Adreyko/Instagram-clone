
import EmojiPicker from 'emoji-picker-react'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/redux-hooks'
import { addNewPost } from '../../../../redux/slices/userSlice/userSlice/thunk/AddNewPost'
import { EmojiClickData } from 'emoji-picker-react/dist/types/exposedTypes'

interface IProps {

    setVisible: (value: boolean | ((prevVisible: boolean) => boolean)) => void;


}

const NewPostModal = ({ setVisible }: IProps) => {
    const [nextStep, setNextStep] = useState<number>(0)
    const [selectedImage, setSelectedImage] = useState<File>()
    const [imagesUrl, setImagesUrl] = useState<string>()
    const [text, setText] = useState<string>('')
    const [showPicker, setShowPicker] = useState(false)

    const dispatch = useAppDispatch()
    const signedUser = useAppSelector(user => user.user.user)



    const { profileImage, userName } = signedUser


    const createNewPostPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return
        }
        const imageToLoad = event.target.files[0]
        setSelectedImage(imageToLoad)
        setNextStep(prev => prev + 1)
    }

    const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        setText(event.currentTarget.value)

    }


    const onEmojiClick = (emojiObject: EmojiClickData) => {
        setText(prev => prev + emojiObject.emoji)
        setShowPicker(false)
    }


    const sharePost = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(await addNewPost({ image: selectedImage as File, text: text }))
        setVisible(false)

    }



    useEffect(() => {
        
        if (selectedImage) {
            setImagesUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);


    return nextStep === 0 ? (

        <div className='  flex-col justify-center items-center text-center rounded-xl bg-white w-[100%]    '>
            <div className=' py-4 border-b-2'>
                <h1>Create new post</h1>
            </div>

            <div className='flex flex-col items-center justify-center h-[100%] p-[20%] '>
                <div className='h-[100%]  flex items-center justify-center'>
                    <img className='object-cover w-[20%] h-auto ' src="/images/create.png" alt="" />
                </div>

                <h1>Drag photos and videos here</h1>
                <label className='bg-blue-500 rounded-lg px-4 py-1 hover:bg-blue-300  text-white'>
                    <input onChange={(e) => createNewPostPreview(e)} type="file" className='hidden' />
                    Select from computer
                </label>
            </div>
        </div>

    ) :
        nextStep === 1 ?
            (
                <div className='flex flex-col bg-white sm:w-[620px] rounded-xl w-[300px] m-[100px] '>
                    <div className=' flex justify-between items-center p-2 '>
                        <button onClick={() => setNextStep(prev => prev - 1)} className='text-2xl flex '>🡠</button>
                        <h1>Crop</h1>
                        <button className='text-blue-400 hover:text-black active:text-blue-200' onClick={() => setNextStep(prev => prev + 1)}>Next</button>
                    </div>
                    <div className='flex items-center bg-black ] h-[400px]    justify-center rounded-b-xl'>
                        <img className='  h-[100%] w-[100%] object-contain ' src={imagesUrl} alt="" />
                    </div>

                </div>
            ) :



            <div className='bg-white  sm:w-[620px] rounded-xl w-[300px] m-[100px]  '>
                <div className=' flex justify-between p-2 '>
                    <button onClick={() => setNextStep(prev => prev - 1)}>🡠</button>
                    <h1>Create new post</h1>
                    <button onClick={(e) => sharePost(e)} className='text-blue-400 hover:text-black active:text-blue-200'>Share</button>

                </div>
                <div className='flex  '>
                    <div className='flex items-center bg-black  h-[400px] justify-center rounded-b-xl w-[70%]'>
                        <img className=' h-[100%] w-[100%] object-contain' src={imagesUrl} alt="" />
                    </div>

                    <div className='w-[40%] '>
                        <div className='bg-white border-[1px]  '>
                            <div className='text-ellipsis  '>
                                <div className=' p-2 py-4 text-ellipsis sm:flex hidden'>                           
                                    <img className='w-8 rounded-full h-8 ' src={profileImage} alt="" />
                                    <h1 className='font-[600] ml-2 text-ellipsis'>{userName}</h1>
                                </div>
                            </div>
                            <div className='p-2 w-full'>
                                <textarea
                                    className='w-full h-[100px] outline-none resize-none'
                                    value={text}
                                    onChange={(e) => textAreaHandler(e)}
                                    name="" id=""
                                    placeholder='Write a caption...'>
                                </textarea>
                            </div>

                            <div className='flex justify-between p-2 text-[13px]'>
                                <button onClick={() => setShowPicker(prev => !prev)}>&#128515;</button>
                                <h1 className='text-gray-400' >{text.length}/2,200</h1>
                            </div>
                            <div className='w-[50%]'>
                                {showPicker &&
                                    <EmojiPicker
                                        onEmojiClick={onEmojiClick}
                                        height={320}

                                    />}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
}

export default NewPostModal 
