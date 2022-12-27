


export interface ISignUp {
    fullName: string,
    userName: string,
    email: string,
    password: string
}


export interface IUserState extends ISignUp{
    dateCreated: number,
    following: {uid: string}[],
    followers: {uid: string}[],
    uid: string ,
    birthdate: string[],
    phoneNumber: string,
    profileImage: string,
    posts: any[],
    savedPosts: string[]
}
