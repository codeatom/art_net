import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import PostService from '../../../services/PostService';
import CommentService from '../../../services/CommentService';

import { setIsPostDetail, updateSinglePostArray } from '../../../store/storeUtil';


const DeleteCommentModal = (props) => {
    const dispatch = useDispatch();

    const deleteComment = () => {
        CommentService.deleteComment(props.commentId).then(() => {
            PostService.getPostByPostId(props.postId).then((response) => {
                let post = [response.data];
                updateSinglePostArray(dispatch, post);
                setIsPostDetail(dispatch, true);
                props.closeDeleteCommentModal();
            })          
        })
    }


    return (
        <Modal
            show={props.showDeleteCommentModal}
            onHide={props.closeDeleteCommentModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete comment?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {props.commentText}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='profile-edit-btn'>
                    <input className='btn btn-primary edit-btn' type='button' value="Cancel" onClick={props.closeDeleteCommentModal} />
                    <input className='btn btn-success edit-btn' type='button' value="Delete" onClick={deleteComment} />
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteCommentModal;