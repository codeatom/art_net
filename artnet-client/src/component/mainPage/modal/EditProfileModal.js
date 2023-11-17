import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import UserService from '../../../services/UserService';

import { updateUserImg } from '../../../store/storeUtil';
import { updateUserName } from '../../../store/storeUtil';


const EditProfileModal = (props) => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleUserName = (e) => {
        setUserName(e.target.value);
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const editProfile = async () => {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        let userUserName = userName;
        let userFirstName = firstName;
        let userLastName = lastName;
        let userData = {};

        await UserService.getUserByUserId(userId).then(response => {
            userUserName = userUserName === "" ? response.data.userName : userUserName;
            userFirstName = userFirstName === "" ? response.data.firstName : userFirstName
            userLastName = userLastName === "" ? response.data.lastName : userLastName         

            userData = {
                "userId": userId,
                "userName": userUserName,
                "firstName": userFirstName,
                "lastName": userLastName,
                "userEmail": response.data.userEmail,
                "userImage": response.data.userImage
            }           
        });

        await UserService.updateUser(userData).then(() => {
            //..
        })

        await UserService.getUserByUserId(userId).then(response => {
            updateUserImg(dispatch, response.data.userImage);
            updateUserName(dispatch, response.data.userName);
        });

        setUserName("");
        setFirstName("");
        setLastName("");

        props.closeEditProfileModal();
    }


    return (
        <div>
            <Modal
                show={props.showEditProfileModal}
                onHide={props.closeEditProfileModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-input-div'>
                        <div>User Name</div>
                        <input className='text-input' type='text' onChange={handleUserName} placeholder="username" />
                    </div>
                    <div className='text-input-div'>
                        <div>User Name</div>
                        <input className='text-input' type='text' onChange={handleFirstName} placeholder="first name" />
                    </div>
                    <div className='text-input-div'>
                        <div>User Name</div>
                        <input className='text-input' type='text' onChange={handleLastName} placeholder="last name" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='profile-edit-btn'>
                        <button className="btn btn-primary edit-btn" variant="secondary" onClick={props.closeUploadModal}>Cancel</button>
                        <button className="btn btn-success edit-btn" variant="secondary" onClick={editProfile}>Submit</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProfileModal;