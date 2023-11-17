import { useState, useEffect } from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail, sendPasswordResetEmail } from "firebase/auth";
import UserService from '../../../services/UserService';
import Modal from 'react-bootstrap/Modal';


const ResetEmailOrPasswordModal = (props) => {
    const [password, setPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [hideMsg, setHideMsg] = useState(true);
    const [msgTxt, setMsgTxt] = useState("");
    const [auth, setAuth] = useState(null);
    const [email, setEmail] = useState("");

    useEffect(() => {
        setAuth(getAuth());
    }, [])

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setHideMsg(true);
    }

    const handleNewEmail = (e) => {
        setNewEmail(e.target.value);
        setHideMsg(true);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setHideMsg(true);
    }

    const reset = () => {
        if (props.isEmailReset === true) {
            resetEmail();
        }
        else {
            resetPassword();
        }
    }

    const resetEmail = () => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);

        if (password === "") {
            setHideMsg(false);
            setMsgTxt("Password is required. Please try again.")
        }
        else if (newEmail === "") {
            setHideMsg(false);
            setMsgTxt("Please enter a new email address.")
        }
        else {
            reauthenticateWithCredential(user, credential).then(() => {
                verifyBeforeUpdateEmail(auth.currentUser, newEmail);
                editUserProfile();
                alert("Use the link sent to your email to reset your email and login again");
                logout();
            }).catch((error) => {
                setHideMsg(false);
                setMsgTxt("Password is not correct. Please try again.")
            });
        }
    }

    const resetPassword = () => {
        const auth = getAuth();

        if (email === "") {
            setHideMsg(false);
            setMsgTxt("Please enter your email.")
        } else {
            sendPasswordResetEmail(auth, email).then(() => {
                alert("Use the link sent to your email to reset your password and login again");
                logout();
            }).catch((error) => {
                setHideMsg(false);
                setMsgTxt("The email provided is not valid. Please try again.")
            });
        }
    }

    const editUserProfile = async () => {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        UserService.getUserByUserId(userId).then(response => {
            let userData = {
                "userId": userId,
                "userName": response.data.userName,
                "firstName": response.data.firstName,
                "lastName": response.data.lastName,
                "userEmail": newEmail,
                "userImage": response.data.userImage
            }
            UserService.updateUser(userData);
        });
    }

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }


    return (
        <Modal
            show={props.showResetEmailOrPwdModal}
            onHide={props.closeResetEmailOrPwdModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div hidden={props.isEmailReset}>Reset password</div>
                    <div hidden={!props.isEmailReset}>Reset email</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='security-setting-input text-input-div' hidden={!props.isEmailReset}>
                    <div style={{marginRight: 10}}>Password</div>
                    <input className='text-input' type='password' onChange={handlePassword} placeholder="password" /><br></br>
                </div>
                <div className='security-setting-input text-input-div' hidden={!props.isEmailReset}>
                    <div>New email</div>
                    <input className='text-input' type='text' onChange={handleNewEmail} placeholder="new email address" /><br></br>
                </div>
                <div className='security-setting-input text-input-div' hidden={props.isEmailReset}>
                    <div>Email</div>
                    <input className='text-input' type='text' onChange={handleEmail} placeholder="enter your email address" /><br></br>
                </div>
                <div hidden={hideMsg} style={{ color: "red" }}>{msgTxt}</div>
            </Modal.Body>
            <Modal.Footer>
                <div className='profile-edit-btn'>
                    <input className='btn btn-primary edit-btn' type='button' value="Cancel" onClick={props.closeResetEmailModal} />
                    <input className='btn btn-success edit-btn' type='button' value="Sumbit" onClick={reset} />
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ResetEmailOrPasswordModal;