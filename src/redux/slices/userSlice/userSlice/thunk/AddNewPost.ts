import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../../../store/store';
import { updateDoc, doc } from 'firebase/firestore';
import { setUser } from '../userSlice';
import { db } from '../../../../../firebase/firebase';
import { storage } from '../../../../../firebase/firebase';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';

type ImageType = {
    image: File,
    text: string

}



export const addNewPost = createAsyncThunk('user/addNewPost', async ({ image,text }: ImageType, { dispatch, getState }) => {
    const userData = (getState() as RootState).user.user

    const imagesRef = ref(storage, `Images/${image.name + nanoid()}`)
    await uploadBytes(imagesRef, image)


    const imagesAdress = await getDownloadURL(imagesRef)

    const newPost = {
        postImage : imagesAdress,
        postId : nanoid(),
        commets : [],
        likes : [],
        text: text,
        user : userData.uid,
        createdData: new Date().getTime().toString()

    }

    await updateDoc(doc(db, 'users',userData.uid), {
            posts:[...userData.posts,newPost]
    })

    
    dispatch(setUser({...userData,posts:[...userData.posts,newPost]}))


    // if(userData.profileImage) {
    //     await deleteObject(ref(storage, userData.profileImage))
    // }
    // console.log(userData)
    // const imagesRef = ref(storage, `Images/${image.name + nanoid()}`)
    // await uploadBytes(imagesRef, image)
    // console.log(updateDoc)


    // const imageAdress = await getDownloadURL(imagesRef)

    // await updateDoc(doc(db,'users',userData.uid),{
    //     profileImage : imageAdress
    // })

    // dispatch(setUser({...userData,profileImage: imageAdress}))

})