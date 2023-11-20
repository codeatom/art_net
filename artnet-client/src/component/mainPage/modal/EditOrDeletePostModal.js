import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStorage, ref, deleteObject } from "firebase/storage";
import Modal from 'react-bootstrap/Modal';
import PostService from '../../../services/PostService';

import { updateUserPostArray } from '../../../store/storeUtil';


const EditOrDeletePostModal = (props) => {
    const dispatch = useDispatch();
    const [postDescription, setPostDescription] = useState(props.post.description);


    useEffect(() => {
        setPostDescription(props.post.description);
    }, [props.isEdit])

    const deleteOrEditPost = () => {
        if (props.isPostEdit) {
            editPostDescription();
        } else {
            deletePost();
        }
    }

    const editPostDescription = () => {
        let postData = {
            "postId": props.post.postId,
            "description": postDescription,
            "postImgURL": props.post.postImgURL,
            "userId": props.post.user.userId,
        }

        PostService.updatePost(postData).then((response) => {
            getAllPostByLocalUserId();
        });

        setPostDescription("");
        props.closeEditOrDeletePostModal();
    }

    const deletePost = () => {
        deleteFromFirebaseStorage(props.post.postImgURL);
        PostService.deletePost(props.post.postId).then((response) => {
            getAllPostByLocalUserId();
        });

        props.closeEditOrDeletePostModal();
    }

    const getAllPostByLocalUserId = () => {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        PostService.getAllByUserId(userId).then(response => {
            updateUserPostArray(dispatch, response.data);
        });
    }

    const deleteFromFirebaseStorage = (imageUrl) => {
        if (imageUrl !== "" && imageUrl !== undefined) {
            const storage = getStorage();
            const postImgRef = ref(storage, imageUrl);
            deleteObject(postImgRef)
        }
    }

    const handlePostDescription = (e) => {
        setPostDescription(e.target.value);
    }


    return (
        <Modal
            show={props.showEditOrDeletePostModal}
            onHide={props.closeEditOrDeletePostModal}
            backdrop="static"
            keyboard={false}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div hidden={!props.isPostEdit}>Edit description</div>
                    <div hidden={props.isPostEdit}>Delete this post?</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div hidden={props.isPostEdit}>{props.post.description}</div>
                <textarea
                    hidden={!props.isPostEdit}
                    rows={3} cols={55} type='text'
                    className='edit-text'
                    value={postDescription}
                    onChange={handlePostDescription} />
                <img src={props.post.postImgURL} className='post-to-delete' />
            </Modal.Body>
            <Modal.Footer>
                <div className='profile-edit-btn'>
                    <input className='btn btn-primary' type='button' value="Cancel" onClick={props.closeEditOrDeletePostModal} />
                    <input className='btn btn-success edit-btn' type='button' value="Edit" onClick={deleteOrEditPost}  hidden={!props.isPostEdit} />
                    <input className='btn btn-danger edit-btn' type='button' value="Delete" onClick={deleteOrEditPost} hidden={props.isPostEdit} />
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default EditOrDeletePostModal;