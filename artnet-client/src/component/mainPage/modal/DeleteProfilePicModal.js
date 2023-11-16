import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, deleteObject } from "firebase/storage";
import Modal from 'react-bootstrap/Modal';
import UserService from '../../../services/UserService';

import { updateUserImg } from '../../../store/storeUtil';


const DeleteProfilePicModal = (props) => {
    const dispatch = useDispatch();
    const userImage = useSelector((state) => state.user.userImage);

    const deleteProfilePic = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        let userData = {
            "userId": user.userId,
            "userName": user.userName,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "userEmail": user.email,
            "userImage": ""
        }
        UserService.updateUser(userData).then(() => {
            deleteFromFirebaseStorage(userImage);
        });
        updateUserImg(dispatch, "");
        props.closeDeleteProfilePicModal();
    }

    const deleteFromFirebaseStorage = (image) => {
        if (image != "" && image != undefined) {
            const storage = getStorage();
            const postImgRef = ref(storage, image);
            deleteObject(postImgRef)
        }
    }


    return (
        <Modal
            show={props.showDeleteProfilePicModal}
            onHide={props.closeDeleteProfilePicModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete pic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    You are about to delete your profile picture.
                    You can add a profile picture again at any time.
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='profile-edit-btn'>
                    <input className='btn btn-primary edit-btn' type='button' value="Cancel" onClick={props.closeDeleteProfilePicModal} />
                    <input className='btn btn-danger edit-btn' type='button' value="Delete" onClick={deleteProfilePic} />
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteProfilePicModal;