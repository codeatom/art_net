import { useDispatch } from 'react-redux';
import avatar from '../../../images/avatar.png';
import likebutton from '../../../images/likebutton.png';
import textIcon from '../../../images/text.png';
import PostService from '../../../services/PostService';

import { updateSinglePostArray } from '../../../store/storeUtil';
import { updateChatArray } from '../../../store/storeUtil';
import { disconnectFromChat } from '../../../store/storeUtil';
import { setIsPostDetail } from '../../../store/storeUtil';
import { hideTxtBox } from '../../../store/storeUtil';


const Post = (props) => {
    const dispatch = useDispatch();
    
    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
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

    const postComment = (postId) => {
        props.connectUserToChat(postId);
        getPostByPostId(postId);
        hideTxtBox(dispatch, false);
        updateChatArray(dispatch, []);
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
            <div className='like-and-comment'>
                <div>
                    <img src={textIcon} onClick={() => postComment(props.postItem.postId, true)} className='comment-symbol' />
                </div>
                <div className='like-and-comment-count'>
                    {props.postItem.comments.length}
                </div>
                <div onClick={() => props.setLikes(props.postItem.postId)}>
                    <img src={likebutton} className='like-symbol' />
                </div>
                <div className='like-and-comment-count'>
                    {props.postItem.likeArray.length}
                </div>
            </div>
        </div>
    );
}

export default Post; 