import avatar from '../../../images/avatar.png';
import likebutton from '../../../images/likebutton.png';
import textIcon from '../../../images/text.png';


const Post = (props) => {
   
    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
    }


    return (
        <div>
            <div>
                <div>
                    <div className='post-header'>
                        <div>
                            <img className='avatar post-avatar-padding' src={handleUserImg(props.postItem.user.userImage)} alt="" />
                        </div>
                        <div className='user-name'>
                            <div>{props.postItem.user.userName}</div>
                        </div>
                        <div>
                            {props.postItem.postDate}
                        </div>
                    </div>
                    <div>
                        <div >
                            {props.postItem.description}
                        </div>
                        <div>
                            <img src={props.postItem.postImgURL} />
                        </div>
                    </div>
                    <div className='like-and-comment'>
                        <div onClick={() => props.setLikes(props.postItem.postId)}>
                            <img src={likebutton} className='like-symbol' />
                        </div>
                        <div>
                            {props.postItem.likeArray.length}
                        </div>
                        <div>
                            <img src={textIcon} className='comment-symbol' />
                        </div>
                        <div>
                            {props.postItem.comments.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post; 