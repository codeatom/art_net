import { useState, useEffect, useRef } from 'react';
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
    const menuRef = useRef();
    const inputRef = useRef();
    const [userList, setUserList] = useState([]);
    const [menuHidden, setMenuHidden] = useState(true);
    const [users, setUsers] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
   

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        closeUploadModal();
        props.setUploadImage("");
    }, [toggleModal])

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setMenuHidden(true);
                inputRef.current.value = "";
                setUserList([]);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [])

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

    const setImageType = () => {
        props.setIsProfileImg(false);
    };

    const openUploadModal = () => {
        setShowUploadModal(true);
        setImageType();
    }

    const closeUploadModal = () => {
        setShowUploadModal(false);
    }

    const searchForUsers = (e) => {
        let keyWord = e.target.value.trimStart();
        if (keyWord !== "") {
            const searchedUsers = users.filter((item) => item.userName.includes(keyWord))
            setUserList(searchedUsers);
        }
        if (userList.length > 0) {
            setMenuHidden(false);
        }
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


            {/*searched users menu*/}
            <div ref={menuRef}>
                <div>
                    <input ref={inputRef} type='text' className='user-search-box' onClick={searchForUsers} onChange={searchForUsers} placeholder="search for someone" />
                </div>
                <div className='right-panel-dropdown-menu txt' hidden={menuHidden}>
                    {
                        userList.map((item) => (
                            <UserImageLayout
                                item={item} />
                        ))
                    }
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
                    showUploadModal={showUploadModal}
                    isProfileImg={props.isProfileImg}
                    closeUploadModal={closeUploadModal}
                    uploadImage={props.uploadImage}
                    downloadURL={props.downloadURL}
                    uploadToFirebase={props.uploadToFirebase}
                    uploadProgress={props.uploadProgress}
                    handlePostDescription={props.handlePostDescription} />
            </div>
        </div >
    );
}

export default RightPanel;