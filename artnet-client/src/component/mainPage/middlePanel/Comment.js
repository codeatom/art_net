import avatar from '../../../images/avatar.png';
import { useState } from 'react';
import deleteIcon from '../../../images/delete.png';
import DeleteCommentModal from '../modal/DeleteCommentModal';


const Comment = (props) => {
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [commentId, setCommentId] = useState("");

    const handleUserImg = (profileImg) => {
        if (profileImg == "" || profileImg == undefined) {
            return avatar;
        }
        return profileImg;
    }

    const handleDeleteBtn = (userId) => {
        const localUser = JSON.parse(localStorage.getItem("user"));

        if (localUser.userId === userId) {
            return false;
        }
        else {
            return true;
        }
    }

    const openDeleteCommentModal = (text, id) => {
        setCommentText(text);
        setCommentId(id);
        setShowDeleteCommentModal(true);
    }

    const closeDeleteCommentModal = () => {
        setShowDeleteCommentModal(false);
    }


    return (
        <div>
            {
                props.item.comments != null ?
                    props.item.comments.map((item) => (
                        <div className='all-comment bg-col-chngr'>
                            <div className='comment'>
                                <div>
                                    <img className='avatar' src={handleUserImg(item.user.userImage)} />
                                </div>
                                <div className='user-name txt'>
                                    {item.user.userName}
                                </div>
                                <div className='comment-date'>
                                    {item.commentDate}
                                </div>
                                <div hidden={handleDeleteBtn(item.user.userId)}>
                                    <img className='delete-icon' src={deleteIcon} alt="" title='Delete' onClick={() => openDeleteCommentModal(item.commentText, item.commentId)} />
                                </div>                               
                            </div>
                            <div className='comment-text'>
                                {item.commentText}
                            </div>
                        </div>
                    ))
                    :
                    <div></div>
            }



            {/*delete comment modal*/}
            <div>
                <DeleteCommentModal
                    showDeleteCommentModal={showDeleteCommentModal}
                    closeDeleteCommentModal={closeDeleteCommentModal}
                    postId={props.item.postId}
                    commentText={commentText}
                    commentId={commentId} />
            </div>
        </div>
    );

}

export default Comment; 