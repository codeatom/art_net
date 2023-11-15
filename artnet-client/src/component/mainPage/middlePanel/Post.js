import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import avatar from '../../../images/avatar.png';
import likebutton from '../../../images/likebutton.png';
import textIcon from '../../../images/text.png';
import PostService from '../../../services/PostService';

import { updateUserPostArray } from '../../../store/storeUtil';
import { updateSinglePostArray } from '../../../store/storeUtil';
import { updateChatArray } from '../../../store/storeUtil';
import { disconnectFromChat } from '../../../store/storeUtil';
import { setIsPostDetail } from '../../../store/storeUtil';
import { hideTxtBox } from '../../../store/storeUtil';


const Post = (props) => {
    const dispatch = useDispatch();
    const [hideIcon, setHideIcon] = useState(false);

    useEffect(() => {
        if (props.postItem.postId < 1) {
            setHideIcon(true);
        }
    }, [])

    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
    }

    const getPostByPostId = (postId) => {
        setTimeout(() => {
            disconnectFromChat(dispatch, true);
        }, 1000);

        PostService.getPostByPostId(postId).then(response => {
            let post = [response.data]
            updateSinglePostArray(dispatch, post);
        });
        setIsPostDetail(dispatch, true);
        hideTxtBox(dispatch, true);
        updateChatArray(dispatch, []);
    }

    const postComment = (postId) => {
        getPostByPostId(postId);
        props.connectUserToChat(postId);
        hideTxtBox(dispatch, false);
        updateChatArray(dispatch, []);
    }

    const setLikes = (postId) => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        PostService.setLikes(postId, localUser.userId).then((response) => {
            PostService.getAllByUserId(response.data.user.userId).then((response) => {
                updateUserPostArray(dispatch, response.data);
            })
        })
    }


    return (
        <div className='post-div bg-col-chngr'>
            <div className='post-header'>
                <div>
                    <img className='avatar post-avatar-padding' src={handleUserImg(props.postItem.user.userImage)} alt="" />
                </div>
                <div className='user-name'>
                    <div>{props.postItem.user.userName}</div>
                </div>
                <div className='post-date'>
                    {props.postItem.postDate}
                </div>
            </div>
            <div>
                <div className='post-description'>
                    {props.postItem.description}
                </div>
                <div>
                    <img src={props.postItem.postImgURL} onClick={() => getPostByPostId(props.postItem.postId)} className='post-image' />
                </div>
            </div>
            <div className='like-and-comment' hidden={hideIcon}>
                <div>
                    <img src={textIcon} onClick={() => postComment(props.postItem.postId, true)} className='comment-symbol' />
                </div>
                <div className='like-and-comment-count'>
                    {props.postItem.comments.length}
                </div>
                <div className='like-icon'><span>Like it</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div onClick={() => setLikes(props.postItem.postId)}>
                    <img src={likebutton} className='like-symbol' />
                </div>
                <div className='like-and-comment-count'>
                    {props.postItem.likeArray.length}
                </div>
                <div className='txt-icon'><span>Reply</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
        </div>
    );
}

export default Post; 