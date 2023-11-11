import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserService from '../../../services/UserService';
import textIcon from '../../../images/text.png';
import imageIcon from '../../../images/image.png';
import avatar from "../../../images/avatar.png";
import UserFileUploadModal from '../modal/UserFileUploadModal';
import UserImageLayout from './UserImageLayout';
import './RightPanel.css'


const RightPanel = (props) => {
    const toggleModal = useSelector((state) => state.parameter.toggleModal);
    const userImage = useSelector((state) => state.user.userImage);
    const userName = useSelector((state) => state.user.userName)
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);


    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        closeUploadModal();
        props.setUploadImage("");
    }, [toggleModal])


    const getUsers = () => {
        UserService.getAllUsers().then(response => {
            setUsers(response.data);
        });
    }

    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
    }

    const openUploadModal = () => {
        setShow(true);
    }

    const closeUploadModal = () => {
        setShow(false);
    }


    return (
        <div>
            <div className='right-panel-profile-div'>
                <div className='profile-data'>
                    <img className='avatar' src={handleUserImg(userImage)} alt='?' />
                    <div className='user-name'>{userName}</div>
                </div>
                <div className='upload-div'>
                    <div className='upload'>
                        <img src={textIcon} className='upload-icon' onClick={openUploadModal} />
                        <div>Say Something</div>
                    </div>
                    <div className='upload'>
                        <img src={imageIcon} className='upload-icon' onClick={openUploadModal} />
                        <div>Upload Art Work</div>
                    </div>
                </div>
            </div>

            {/*users*/}
            <div className='user-list'>
                {
                    users.map((item) => (
                        <UserImageLayout
                            item={item} />
                    ))
                }
            </div>

            
            {/*upload modal*/}
            <div>
                <UserFileUploadModal
                    show={show}
                    closeUploadModal={closeUploadModal}
                    uploadImage={props.uploadImage}
                    downloadURL={props.downloadURL}
                    uploadToFirebase={props.uploadToFirebase}
                    handlePostDescription={props.handlePostDescription}
                    uploadProgress={props.uploadProgress} />
            </div>
        </div >
    );
}

export default RightPanel;