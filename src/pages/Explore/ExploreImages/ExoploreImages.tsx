import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IPost } from '../../../interfaces/interfaces';
interface ParentStateItem {

    postImage: string;
    index: string
    postId: string;
    uid: string;

}


const ExoploreImages: React.FC<ParentStateItem> = ({ postImage, postId, uid }) => {
    console.log(uid)
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    return (
        <Link to={`/${uid}/${postId}`} state={{ background: location }} onClick={() => setVisible(true)}>
            <div className=' flex  w-[100%]  h-auto bg-black '>
                <img className='object-cover sm:w-[700px] sm:h-[20rem] h-[150px] w-[300px] cursor-pointer hover:opacity-50' src={postImage} alt="" />
            </div> 

        </Link>
    )
}

export default ExoploreImages