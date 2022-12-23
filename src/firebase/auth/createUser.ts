
import { db } from '../firebase'
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// import { setDoc, doc } from 'firebase/firestore'
// import { IUserState } from '../../interfaces/interfaces';





// const createUser: (user: IUserState) => Promise<string> = async (user) => {
//     const auth = getAuth()

//     const userCreated = await createUserWithEmailAndPassword(auth, user.email, user.password)

//     const docUser = doc(db, 'users', user.user.uid)

//     const userProperties =
//     {
//         ...user,
//         following: [],
//         followers: [],
//         dateCreated: new Date().getTime(),
//         birthdate: "",
//         phoneNumber: "",
//         profileImage: "",
//         posts: [],
//         savedPosts: [],
//     }
//     await setDoc(docUser,userProperties)

//     return auth.userCreated?.uid || ''
// }

// export default createUser