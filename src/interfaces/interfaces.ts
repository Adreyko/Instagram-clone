


export interface ISignUp {
    fullName: string,
    userName: string,
    email: string,
    password: string
}


export interface IUserState extends ISignUp{
    dateCreated: number,
    following: {userId: string}[],
    followers: {userId: string}[],
    uid: string,
    birthdate: string[],
    phoneNumber: string,
    profileImage: string,
    posts: string[],
    savedPosts: string[]
}
