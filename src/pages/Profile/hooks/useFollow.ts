import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux-hooks";
import { setUser } from "../../../redux/slices/userSlice/userSlice/userSlice";
import { setAnotherUser } from "../../../redux/slices/userSlice/anotherUserSlice/anotherUserSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { uptime } from "process";




type userToFollow = {
    profileImage: string,
    userName: string,
    fullName: string,
    uid: string
}

const useFollow = () => {
    const anotherUser = useAppSelector(user => user.anotherUser.user)
    const signedUser = useAppSelector(user => user.user.user)
    const dispatch = useAppDispatch()


    const followPerson = async ({ userName, fullName, profileImage, uid }: userToFollow) => {

console.log(uid)
        const anotherUserIsFollowing = signedUser.following.find(user => user.uid === uid)
            

        if (anotherUser.uid === uid) {
            if (!anotherUserIsFollowing) {


                dispatch(setUser({
                    ...signedUser, following: [...signedUser.following, {
                        userName,
                        fullName,
                        profileImage,
                        uid,
                    }]
                }))
                dispatch(setAnotherUser({
                    ...anotherUser, followers: [...anotherUser.followers, {
                        userName: signedUser.userName,
                        fullName: signedUser.fullName,
                        profileImage: signedUser.profileImage,
                        uid: signedUser.uid
                    }]
                }))

                await updateDoc(doc(db, 'users', uid), {
                    followers: [...anotherUser.followers, {
                        userName: signedUser.userName,
                        fullName: signedUser.fullName,
                        profileImage: signedUser.profileImage,
                        uid: signedUser.uid
                    }]
                })
                await updateDoc(doc(db, 'users', signedUser.uid), {
                    following: [...signedUser.following, {
                        userName,
                        fullName,
                        profileImage,
                        uid
                    }]
                })
            }
        }




    }
    const unFollowPerson = async (uid: string) => {

        const filteredFollowers = anotherUser.followers.filter(follower => follower.uid !== signedUser.uid)
        const filteredFollowing = signedUser.following.filter(person => person.uid !== uid)

        dispatch(setUser({ ...signedUser, following: filteredFollowing }))
        dispatch(setAnotherUser({ ...anotherUser, followers: filteredFollowers }))

        await updateDoc(doc(db, 'users', signedUser.uid), {
            following: filteredFollowing
        })
        await updateDoc(doc(db, 'users', uid), {
            followers: filteredFollowers
        })

    }

    return { followPerson, unFollowPerson }


}
export default useFollow