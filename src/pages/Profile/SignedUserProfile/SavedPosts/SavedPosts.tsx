import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../firebase/firebase'
import { useParams } from 'react-router-dom'
import { SavedPost } from './SavedPost'


const SavedPosts = () => {

  const [savedPosts, setSavedPosts] = useState<any[]>()

  const { uid } = useParams()
 


  const savedImage = savedPosts?.map((post: { postImage: string; postId: string; user: string }) => (
    <SavedPost postImage={post.postImage} postId={post.postId} user={post.user} />
))




  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", uid as string)
      const docSnap = await getDoc(docRef);


      setSavedPosts(docSnap.data()?.savedPosts)
    }

    getData()
  }, [])


  return (
    <div className=' grid grid-cols-3 gap-6  mt-2  '> {savedImage?.reverse()} </div>
  )
}

export default SavedPosts