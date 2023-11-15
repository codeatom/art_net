import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostService from '../../../services/PostService';
import likebutton from '../../../images/likebutton.png';
import textIcon from '../../../images/text.png';
import avatar from "../../../images/avatar.png";
import "./LeftPanel.css";

import { updateAllPostArray } from '../../../store/storeUtil';
import { updateUserPostArray } from '../../../store/storeUtil';
import { updateSinglePostArray } from '../../../store/storeUtil';
import { updateChatArray } from '../../../store/storeUtil';
import { disconnectFromChat } from '../../../store/storeUtil';
import { setIsPostDetail } from '../../../store/storeUtil';
import { hideTxtBox } from '../../../store/storeUtil';


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
        PostService.getAllByUserId(userId).then(response => {
            updateUserPostArray(dispatch, response.data);
        });
        setIsPostDetail(dispatch, false);
    }

    const getPostByPostId = (postId) => {
        PostService.getPostByPostId(postId).then(response => {
            let post = [response.data]
            updateSinglePostArray(dispatch, post);
        });
        setIsPostDetail(dispatch, true);
        hideTxtBox(dispatch, true);
        updateChatArray(dispatch, []);
        disconnectFromChat(dispatch, true);
    }

    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1;
        if (bottom) {
            getAllPost();
        }
    }


    return (
        <div className='on-scroll' onScroll={handleScroll}>
            {
                allPostArray != null ?
                    allPostArray.map((item) => (
                        <div key={item.userId} className='left-panel-paper v-line bg-col-chngr'>
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
                                    <img src={textIcon} className='left-panel-like-symbol' />
                                </div>
                                <div className='left-panel-like-count'>
                                    {item.comments.length}
                                </div>
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

