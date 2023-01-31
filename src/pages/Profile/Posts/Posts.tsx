import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../../firebase/firebase'
import { doc } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'
import { Post } from './Post'

export const Posts = () => {

    const { uid } = useParams()

    const [post, setPost] = useState<any[]>()


    const postImage = post?.map(post => (
        <Post postImage={post.postImage} postId={post.postId} user={post.user} />
    ))




    useEffect(() => {

        const fetchData = async () => {
            const docRef = doc(db, "users", uid as string)
            const docSnap = await getDoc(docRef);

            setPost(docSnap.data()?.posts)

        }
        fetchData()
    }, [])

    return (

        <div className=' grid grid-cols-3 gap-6  mt-2  '> {postImage?.reverse()} </div>
    )


}
