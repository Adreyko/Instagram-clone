import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
interface ParentStateItem {

    postImage: string;
    index: string
    postId: string;
    uid: string;

}

interface ParentState {
    posts: ParentStateItem;
}

const ExoploreImages: React.FC<ParentStateItem> = ({ postImage, index, postId, uid }) => {
    console.log(uid)
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    return (
        <Link to={`/${uid}/${postId}`} state={{ background: location }} onClick={() => setVisible(true)}>
            <div className=' flex  w-[100%]  h-auto '>
                <img className='object-cover w-[100%] h-[100px] md:h-[300px] cursor-pointer' src={postImage} alt="" />
            </div>

        </Link>
    )
}

export default ExoploreImages