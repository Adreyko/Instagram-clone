import { useSelector } from "react-redux";
import { useAppSelector } from "./redux-hooks";


export function useAuth(){
    const {email,profileImage} = useAppSelector(state => state.user.user)

    return{
        isAuth:!!email,
        email,
        profileImage
    };
}