import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../../images/avatar.png';
import likebutton from '../../../images/likebutton.png';
import backbutton from '../../../images/back.png';
import textIcon from '../../../images/text.png';
import PostService from '../../../services/PostService';
import CommentService from '../../../services/CommentService';
import Comment from './Comment';
import Chat from './Chat';

import { updateSinglePostArray } from '../../../store/storeUtil';
import { updateUserPostArray } from '../../../store/storeUtil';
import { setIsPostDetail } from '../../../store/storeUtil';
import { hideTxtBox } from '../../../store/storeUtil';


const PostDetail = (props) => {
    const dispatch = useDispatch();
    const chatArray = useSelector((state) => state.chat.chatArray);
    const hideTextBox = useSelector((state) => state.parameter.hideTextBox);
    const localUserImage = useSelector((state) => state.user.userImage);
    const localUserName = useSelector((state) => state.user.userName);
    const [comment, setComment] = useState("");
    const chatRef = useRef(null);

    useEffect(() => {
        scrollToLastChat();
    }, [chatArray]);

    const scrollToLastChat = () => {
        chatRef.current?.scrollIntoView();
    }

    const handleUserImg = (profileImg) => {
        if (profileImg === "" || profileImg === undefined) {
            return avatar;
        }
        return profileImg;
    }

    const getAllByUserId = () => {
        let userId = JSON.parse(localStorage.getItem("user")).userId
        PostService.getAllByUserId(userId).then(response => {
            updateUserPostArray(dispatch, response.data);
        });
        setIsPostDetail(dispatch, false);
    }

    const connectUserToChat = (postId) => {
        props.connectUserToChat(postId);
        hideTxtBox(dispatch, false);
        scrollToLastChat();
    }

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const setLikes = (postId) => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        PostService.setLikes(postId, localUser.userId).then((response) => {
            let post = [response.data];
            updateSinglePostArray(dispatch, post);
        })
    }

    const postComment = (e) => {
        e.preventDefault();
        setComment("");
        submitComment(comment, props.postItem.postId);
    }

    const submitComment = (commentText, postId) => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        const commentData = {
            "postId": postId,
            "userId": localUser.userId,
            "commentText": commentText
        }
        CommentService.createComment(commentData).then(resonse => {
            var chatMsg = {
                "userName": resonse.data.user.userName,
                "userImage": resonse.data.user.userImage,
                "commentDate": resonse.data.commentDate,
                "commentText": resonse.data.commentText
            }
            props.sendChatText(chatMsg, postId);
        });
    }


    return (
        <div>
            <div className='back-btn-div'>
                <img className='back-btn-icon' src={backbutton} onClick={() => setIsPostDetail(dispatch, false)} />
            </div>

            <div className='post-header'>
                <div>
                    <img className='avatar post-detail-avatar-tweak' src={handleUserImg(props.postItem.user.userImage)} />
                </div>
                <div className='user-name txt user-name-tweak'>
                    <div onClick={() => getAllByUserId()}>{props.postItem.user.userName}</div>
                </div>
                <div className='post-date post-date-tweak'>
                    {props.postItem.postDate}
                </div>
            </div>

            <div className='col-10 post-description'>
                {props.postItem.description}
            </div>

            <div>
                <img src={props.postItem.postImgURL} className='post-image' />
            </div>

            <div className='like-and-comment'>
                <div onClick={() => connectUserToChat(props.postItem.postId)}>
                    <img src={textIcon} title="Reply" className='txt-icon' />
                </div>
                <div className='like-and-comment-count'>
                    {props.postItem.comments.length}
                </div>
                <div onClick={() => setLikes(props.postItem.postId)}>
                    <img src={likebutton} title="Like it" className='like-icon' />
                </div>
                <div className='like-and-comment-count'>
                    {props.postItem.likeArray.length}
                </div>
            </div>

            {/*Comments*/}
            <Comment item={props.postItem} />

            {/*Chats*/}
            <Chat />

            <div className='comment-text-div' hidden={hideTextBox}>
                <img className='avatar' src={handleUserImg(localUserImage)} alt='' />
                <div className='user-name txt' onClick={() => getAllByUserId()}>{localUserName}</div>
                <form onSubmit={postComment}>
                    <input type='text' value={comment} onChange={handleComment} className='comment-text-box' placeholder="Write a comment" />
                    <input type="submit" value=">>" className='btn' />
                </form>
            </div>
            <div ref={chatRef} />
        </div>
    );
}

export default PostDetail;