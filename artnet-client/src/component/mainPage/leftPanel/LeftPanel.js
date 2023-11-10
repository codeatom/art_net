import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import avatar from "../../../images/avatar.png";
import PostService from '../../../services/PostService';
import likebutton from '../../../images/likebutton.png';
import "./LeftPanel.css";


const LeftSide = () => {
    const dispatch = useDispatch();
    const allPostArray = useSelector((state) => state.post.allPostArray);
    const UPDATE_ALL_POST_ARRAY = 'UPDATE_ALL_POST_ARRAY';
    const UPDATE_SINGLE_POST_ARRAY = 'UPDATE_SINGLE_POST_ARRAY';
    const IS_POST_DETAIL = 'IS_POST_DETAIL';

    useEffect(() => {
        getAllPost();
    }, [])

    const getAllPost = () => {
        PostService.getAllPost().then(response => {
            undateAllPostArray(response.data);
        });
    }

    const getPostByPostId = (postId) => {
        const post = allPostArray.filter((item) => item.postId === postId)
        undateSinglePostArray(post);
        setIsPostDetail(true);
    }

    const undateAllPostArray = (post) => {
        dispatch({
            type: UPDATE_ALL_POST_ARRAY,
            allPostList: post
        });
    };

    const undateSinglePostArray = (post) => {
        dispatch({
            type: UPDATE_SINGLE_POST_ARRAY,
            singlePostList: post
        });
    };

    const setIsPostDetail = (postDetail) => {
        dispatch({
            type: IS_POST_DETAIL,
            isPostDetail: postDetail
        });
    };

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
                                    <div>{item.user.userName}</div>
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

