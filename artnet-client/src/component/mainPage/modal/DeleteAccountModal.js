import { useState, useEffect } from 'react';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import Modal from 'react-bootstrap/Modal';
import PostService from '../../../services/PostService';
import UserService from '../../../services/UserService';
import CommentService from '../../../services/CommentService';


const DeleteCommentModal = (props) => {
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(null);
    const [passwordMsg, setPasswordMsg] = useState(true);
    const [passwordMsgTxt, setPasswordMsgTxt] = useState("");

    useEffect(() => {
        setAuth(getAuth());
    }, [])

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const deleteAccount = async () => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);

        if (password === "") {
            setPasswordMsg(false);
            setPasswordMsgTxt("Please enter password")
        } else {
            reauthenticateWithCredential(user, credential).then(() => {
                removeAccount();
            }).catch((error) => {
                setPasswordMsg(false);
                setPasswordMsgTxt("Password is not correct. Please try again")
            });
        }
    }

    const removeAccount = async () => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);
        const userId = JSON.parse(localStorage.getItem("user")).userId;

        await reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            deleteUser(user);
        })

        await PostService.getAllByUserId(userId).then(response => {
            response.data.forEach(post => {
                deleteFromFirebaseStorage(post.postImgURL);
            });
        });

        await UserService.getUserByUserId(userId).then((response) => {
            deleteFromFirebaseStorage(response.data.userImage);
        })


        await PostService.deleteAllPostByUserId(userId);
        await CommentService.deleteAllCommentByUserId(userId);
        await UserService.deleteUser(userId);

        logout();
    }

    const deleteFromFirebaseStorage = (imageUrl) => {
        if (imageUrl !== "") {
            const storage = getStorage();
            const postImgRef = ref(storage, imageUrl);
            deleteObject(postImgRef)
        }
    }

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }


    return (
        <Modal
            show={props.showDeleteAccountModal}
            onHide={props.closeDeleteAccountModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete your account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    You are about to delete your account.
                    This action is not reversable. When you delete your account, every post connected to your account will be lost.
                    <br></br>
                    <br></br>
                    If you still want to continue, enter your password and click submit.
                    <br></br>
                    <br></br>
                </div>
                <div className='security-setting-input delete-acct'>
                    <input className='text-input' type='text' onChange={handlePassword} placeholder="password" />
                </div>
                <div hidden={passwordMsg} style={{ color: "red" }}>{passwordMsgTxt}</div>
            </Modal.Body>
            <Modal.Footer>
                <div className='profile-edit-btn'>
                    <input className='btn btn-primary edit-btn' type='button' value="Cancel" onClick={props.closeDeleteAccountModal} />
                    <input className='btn btn-danger edit-btn' type='button' value="Delete Account" onClick={deleteAccount} />
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteCommentModal;