import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import avatar from "../../../images/avatar.png";
import PostService from '../../../services/PostService';
import likebutton from '../../../images/likebutton.png';
import "./LeftPanel.css";

import { updateAllPostArray } from '../../../store/storeUtil';
import { updateUserPostArray } from '../../../store/storeUtil';
import { updateSinglePostArray } from '../../../store/storeUtil';
import { setIsPostDetail } from '../../../store/storeUtil';


const LeftSide = () => {
    const dispatch = useDispatch();
    const allPostArray = useSelector((state) => state.post.allPostArray);

    useEffect(() => {
        getAllPost();
    }, [])

    const getAllPost = () => {
        PostService.getAllPost().then(response => {
            updateAllPostArray(dispatch, response.data);
        });
    }

    const getAllByUserId = (userId) => {
        const post = allPostArray.filter((item) => item.user.userId === userId)
        updateUserPostArray(dispatch, post);
        setIsPostDetail(dispatch, false);
    }

    const getPostByPostId = (postId) => {
        const post = allPostArray.filter((item) => item.postId === postId)
        updateSinglePostArray(dispatch, post);
        setIsPostDetail(dispatch, true);
    }

    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
    }


    return (
        <div>
            {
                allPostArray != null ?
                    allPostArray.map((item) => (
                        <div key={item.userId} className='left-panel-paper v-line'>
                            <div className='left-panel-post-header'>
                                <div>
                                    <img className='avatar left-panel-avatar-padding' src={handleUserImg(item.user.userImage)} />
                                </div>
                                <div className='user-name txt'>
                                    <div onClick={() => getAllByUserId(item.user.userId)}>{item.user.userName}</div>
                                </div>
                                <div className='post-date'>
                                    <div>{item.postDate}</div>
                                </div>
                            </div>
                            <div >
                                <img src={item.postImgURL} onClick={() => getPostByPostId(item.postId)} className='left-panel-image' />
                            </div>

                            <div className='left-panel-like-div'>
                                <div>
                                    <img src={likebutton} className='left-panel-like-symbol' />
                                </div>
                                <div className='left-panel-like-count'>
                                    {item.likeArray.length}
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div></div>
            }
        </div>
    );
}

export default LeftSide;

