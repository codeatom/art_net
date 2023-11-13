import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import avatar from '../../../images/avatar.png';
import likebutton from '../../../images/likebutton.png';
import textIcon from '../../../images/text.png';
import Comment from './Comment';

import { updateSinglePostArray } from '../../../store/storeUtil';
import { setIsPostDetail } from '../../../store/storeUtil';


const Post = (props) => {
    const dispatch = useDispatch();
    const allPostArray = useSelector((state) => state.post.allPostArray);

    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
    }

    const getPostByPostId = (postId) => {
        const post = allPostArray.filter((item) => item.postId === postId)
        updateSinglePostArray(dispatch, post);
        setIsPostDetail(dispatch, true);
    }


    return (
        <div>
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
            <div className='like-and-comment'>
                <div onClick={() => props.setLikes(props.postItem.postId)}>
                    <img src={likebutton} className='like-symbol' />
                </div>
                <div className='like-and-comment-count'>
                    {props.postItem.likeArray.length}
                </div>
                <div>
                    <img src={textIcon} onClick={() => getPostByPostId(props.postItem.postId)} className='comment-symbol' />
                </div>
                <div className='like-and-comment-count'>
                    {props.postItem.comments.length}
                </div>
            </div>


            {/*Comments*/}
            <Comment
                item={props.postItem} />
        </div>
    );
}

export default Post; 