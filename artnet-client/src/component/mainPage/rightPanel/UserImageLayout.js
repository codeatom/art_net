import { useDispatch } from 'react-redux';
import PostService from '../../../services/PostService';
import UserService from '../../../services/UserService';
import avatar from "../../../images/avatar.png";

import { updateUserPostArray } from '../../../store/storeUtil';
import { setIsPostDetail } from '../../../store/storeUtil';


const ImageLayout = (props) => {
    const dispatch = useDispatch();

    const handleUserImg = (profileImg) => {
        if (profileImg == "" || profileImg == undefined) {
            return avatar;
        }
        return profileImg;
    }

    const getAllByUserId = (userId) => {
        PostService.getAllByUserId(userId).then(response => {
            if (response.data.length > 0) {
                updateUserPostArray(dispatch, response.data);
            } else {
                getDummyPostArray(userId);
            }
        });

        setIsPostDetail(dispatch, false);
    }

    const getDummyPostArray = (userId) => {
        UserService.getUserByUserId(userId).then(response => {
            let dummyPostArray = [
                {
                    postId: 0,
                    description: response.data.userName + " " + "has no post yet",
                    postImgURL: "",
                    postDate: "",
                    likeArray: [],
                    user: response.data,
                    comments: []
                }
            ]
            updateUserPostArray(dispatch, dummyPostArray);
        });
    }



    return (
        <div className='user-img-layout bg-col-chngr'>
            <div className='user-img' key={props.item.userId}>
                <div>
                    <img className='avatar' src={handleUserImg(props.item.userImage)} />
                </div>
                <div className='user-name txt' onClick={() => getAllByUserId(props.item.userId)}>
                    {props.item.userName}
                </div>
            </div>
        </div>
    );
}

export default ImageLayout;