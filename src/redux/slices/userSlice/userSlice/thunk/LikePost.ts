import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
// import { RootState } from '../../../../store/store';
// import { updateDoc, doc, getDoc } from 'firebase/firestore';
// import { setUser } from '../userSlice';
// import { db } from '../../../../../firebase/firebase';
// import { storage } from '../../../../../firebase/firebase';
// import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
// import { setAnotherUser } from '../../anotherUserSlice/anotherUserSlice';
// import { async } from '@firebase/util';

// type likePostType = {
   
//     uid: string
//     postId: string;
// }




//  const likePost =  async ({ uid, postId }: likePostType) => {
//     // const userData = (getState() as RootState).user.user
//     // const anotherUser = (getState() as RootState).anotherUser.user

//     const dispatch = useAppDispatch()
//     const signedUser = useAppSelector(user=> user.user.user)
//     const anotherUser = useAppSelector(user=>user.anotherUser.user)
//     const docRef = doc(db, "users", uid)
//     const docSnap = await getDoc(docRef);

// console.log(uid)

// console.log(docSnap.data())


//     const likedPerson = 
//         {
//             userName: signedUser.userName,
//             fullName: signedUser.fullName,
//             profileImage: signedUser.profileImage,
//             uid: signedUser.uid
//         }

    


//     const newPostsArr = docSnap.data()?.posts.map((post: { postId: string; likes: any; }) => {
//         return post.postId === postId ?
//             { ...post, likes: [...post.likes, likedPerson] }
//             : post
//     })

 
  

//     if (signedUser.uid === uid) {
//         dispatch(setUser({
//             ...signedUser, posts: newPostsArr
//         }))
//     } else {
//         dispatch(setAnotherUser({
//             ...anotherUser, posts: newPostsArr
//         }))
//     }
//     console.log(newPostsArr)



//     console.log(docSnap.data())

    
   
//     await updateDoc(docRef, {
//         posts: newPostsArr
//     })

// console.log(1)
// }


