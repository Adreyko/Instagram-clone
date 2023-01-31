
export interface ISignUp {
    fullName: string,
    userName: string,
    email: string,
    password: string
}


export interface IUserState extends ISignUp{
    dateCreated: number,
    following: any[],
    followers: any[],
    uid: string ,
    phoneNumber: string,
    profileImage: string,
    posts: any[],
    savedPosts: any[]
}


export interface IuserData {

    fullName: string;
    userName: string;
    uid: string;
    profileImage: string

}


export interface IPost {

    postImage: string;
    user: string;
    postId: string;

}


