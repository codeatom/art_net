import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../../images/logo.png";
import avatar from "../../../images/avatar.png";
import UserService from '../../../services/UserService';
import UserFileUploadModal from '../modal/UserFileUploadModal';
import DropDownMenu from './DropDownMenu';
import EditProfileModal from '../modal/EditProfileModal';
import DeleteProfilePicModal from '../modal/DeleteProfilePicModal';
import ResetEmailOrPasswordModal from '../modal/ResetEmailOrPasswordModal';
import DeleteAccountModal from '../modal/DeleteAccountModal';
import "./Header.css";

import { updateUserImg } from '../../../store/storeUtil';
import { updateUserName } from '../../../store/storeUtil';


const Header = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.user.userName);
    const userImage = useSelector((state) => state.user.userImage);
    const toggleModal = useSelector((state) => state.parameter.toggleModal);
    const menuRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isEmailReset, setIsEmailReset] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [showDeleteProfilePicModal, setShowDeleteProfilePicModal] = useState(false);
    const [showResetEmailOrPwdModal, setShowResetEmailOrPwdModal] = useState(false);


    useEffect(() => {
        getLocalUser();
        closeUploadModal();
        props.setUploadImage("");
    }, [toggleModal])

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);

    const getLocalUser = () => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        UserService.getUserByUserId(localUser.userId).then(response => {
            updateUserImg(dispatch, response.data.userImage);
            updateUserName(dispatch, response.data.userName);
        });
    }

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
    }

    const setImageType = () => {
        props.setIsProfileImg(true);
    };

    const openUploadModal = () => {
        setShowUploadModal(true);
        setImageType();
        setMenuOpen(false);
    }

    const closeUploadModal = () => {
        setShowUploadModal(false);
    }

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    const openDeleteProfilePicModal = () => {
        setShowDeleteProfilePicModal(true);
        setMenuOpen(false);
    }

    const closeDeleteProfilePicModal = () => {
        setShowDeleteProfilePicModal(false);
    }

    const openEditProfileModal = () => {
        setShowEditProfileModal(true);
        setMenuOpen(false);
    }

    const closeEditProfileModal = () => {
        setShowEditProfileModal(false);
    }

    const openResetEmailOrPwdModal = (reset) => {
        setShowResetEmailOrPwdModal(true);
        setIsEmailReset(reset);
        setMenuOpen(false);
    }

    const closeResetEmailOrPwdModal = () => {
        setShowResetEmailOrPwdModal(false);
    }

    const openDeleteAccountModal = () => {
        setShowDeleteAccountModal(true);
        setMenuOpen(false);
    }

    const closeDeleteAccountModal = () => {
        setShowDeleteAccountModal(false);
    }


    return (
        <div className="container header-div">
            <div className="row align-items-start h-line-left"> {/* a bootstrap row */}
                <div className="col-2"> {/* a column */}
                    <div>
                        <img src={logo} className='header-logo' />
                    </div>
                </div>

                <div className="col-8"> {/* a column */}
                    {/*Unused section*/}
                </div>

                <div className="col-2"> {/* a column */}
                    <div ref={menuRef}>
                        <div onClick={handleMenu}>
                            <div className='header-user-data'>
                                <div>
                                    <img src={handleUserImg(userImage)} alt='' class="avatar avatar-tweak" />
                                </div>
                                <div className='user-name header-profile-name'>
                                    {userName}
                                </div>
                            </div>
                        </div>
                        <div className='header-dropdown-menu' hidden={!menuOpen}>
                            <ul>
                                <div onClick={openUploadModal}>
                                    <DropDownMenu text="Add profile pic" />
                                </div>
                                <div onClick={openDeleteProfilePicModal}>
                                    <DropDownMenu text="Delete profile pic" />
                                </div>
                                <div onClick={openEditProfileModal}>
                                    <DropDownMenu text="Edit profile" />
                                </div>
                                <div onClick={() => openResetEmailOrPwdModal(false)}>
                                    <DropDownMenu text="Reset password" />
                                </div>
                                <div onClick={() => openResetEmailOrPwdModal(true)}>
                                    <DropDownMenu text="Reset email" />
                                </div>
                                <div onClick={openDeleteAccountModal}>
                                    <DropDownMenu text="Delete account" />
                                </div>
                                <div onClick={logout}>
                                    <DropDownMenu text="Logout" />
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <UserFileUploadModal
                showUploadModal={showUploadModal}
                isProfileImg={props.isProfileImg}
                closeUploadModal={closeUploadModal}
                uploadImage={props.uploadImage}
                downloadURL={props.downloadURL}
                uploadToFirebase={props.uploadToFirebase}
                uploadProgress={props.uploadProgress} />

            <DeleteProfilePicModal
                showDeleteProfilePicModal={showDeleteProfilePicModal}
                closeDeleteProfilePicModal={closeDeleteProfilePicModal} />

            <EditProfileModal
                showEditProfileModal={showEditProfileModal}
                closeEditProfileModal={closeEditProfileModal} />

            <ResetEmailOrPasswordModal
                showResetEmailOrPwdModal={showResetEmailOrPwdModal}
                closeResetEmailOrPwdModal={closeResetEmailOrPwdModal}
                isEmailReset={isEmailReset} />

            <DeleteAccountModal
                showDeleteAccountModal={showDeleteAccountModal}
                closeDeleteAccountModal={closeDeleteAccountModal} />

        </div>
    );
}

export default Header;