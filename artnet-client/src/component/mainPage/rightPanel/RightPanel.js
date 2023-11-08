import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserService from '../../../services/UserService';
import PostService from '../../../services/PostService';
import textIcon from '../../../images/text.png';
import imageIcon from '../../../images/image.png';
import avatar from "../../../images/avatar.png";
import UserFileUploadModal from '../modal/UserFileUploadModal';
import UserImageLayout from './UserImageLayout';
import './RightPanel.css'


const RightPanel = (props) => {
    const dispatch = useDispatch();
    const toggleModal = useSelector((state) => state.parameter.toggleModal);
    const userImage = useSelector((state) => state.user.userImage);
    const userName = useSelector((state) => state.user.userName)
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const UPDATE_USER_POST_ARRAY = 'UPDATE_USER_POST_ARRAY';


    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        closeUploadModal();
        props.setUploadImage("");
        getLocalUserPostArray();
    }, [toggleModal])


    const getUsers = () => {
        UserService.getAllUsers().then(response => {
            setUsers(response.data);
        });
    }

    const getLocalUserPostArray = () => {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        PostService.getAllByUserId(userId).then(response => {
            if (response.data.length > 0) {
                undateUserPostArray(response.data);
            } 
        });
    }

    const undateUserPostArray = (post) => {
        dispatch({
            type: UPDATE_USER_POST_ARRAY,
            userPostList: post
        });
    };

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