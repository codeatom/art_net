import { useDispatch } from 'react-redux';
import avatar from '../../../images/avatar.png';
import likebutton from '../../../images/likebutton.png';
import backbutton from '../../../images/back.png';
import textIcon from '../../../images/text.png';
import Comment from './Comment';

import { setIsPostDetail } from '../../../store/storeUtil';


const PostDetail = (props) => {
    const dispatch = useDispatch();

    const handleUserImg = (profileImg) => {
        if (profileImg === "" || profileImg === undefined) {
            return avatar;
        }
        return profileImg;
    }


    return (
        <div>
            <div className='back-btn-div'>
                <img className='back-btn-icon' src={backbutton} onClick={() => setIsPostDetail(dispatch, false)} />
            </div>

            <div>
                <div>
                    <div className='post-header'>
                        <div>
                            <img className='avatar post-detail-avatar-tweak' src={handleUserImg(props.postItem.user.userImage)} />
                        </div>
                        <div className='user-name txt user-name-tweak'>
                            <div>{props.postItem.user.userName}</div>
                        </div>
                        <div className='post-date post-date-tweak'>
                            {props.postItem.postDate}
                        </div>
                    </div>
                    <div className='post-description'>
                        {props.postItem.description}
                    </div>
                    <div>
                        <img src={props.postItem.postImgURL} className='post-image' />
                    </div>
                    <div className='like-and-comment'>
                        <div onClick={() => props.setLikes(props.postItem.postId)}>
                            <img src={likebutton} className='like-symbol' />
                        </div>
                        <div className='like-and-comment-count'>
                            {props.postItem.likeArray.length}
                        </div>
                        <div>
                            <img src={textIcon} className='comment-symbol' />
                        </div>
                        <div className='like-and-comment-count'>
                            {props.postItem.comments.length}
                        </div>
                    </div>
                </div>
            </div>


            {/*Comments*/}
            <Comment
                item={props.postItem} />
 
        </div>
    );
}

export default PostDetail;