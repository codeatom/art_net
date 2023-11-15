import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../../images/logo.png";
import avatar from "../../../images/avatar.png";
import UserService from '../../../services/UserService';
import UserPicUploadModal from '../modal/UserPicUploadModal';
import DropDownMenu from './DropDownMenu';
import "./Header.css";

import { updateUserImg } from '../../../store/storeUtil';
import { updateUserName } from '../../../store/storeUtil';


const Header = (props) => {
    const dispatch = useDispatch();
    const userImage = useSelector((state) => state.user.userImage);
    const userName = useSelector((state) => state.user.userName);
    const toggleModal = useSelector((state) => state.parameter.toggleModal);
    const menuRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);


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
        setMenuOpen(false);
        setImageType();
    }

    const closeUploadModal = () => {
        setShowUploadModal(false);
    }

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
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
                                <div onClick={logout}>
                                    <DropDownMenu text="Logout" />
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <UserPicUploadModal
                showUploadModal={showUploadModal}
                closeUploadModal={closeUploadModal}
                uploadImage={props.uploadImage}
                downloadURL={props.downloadURL}
                uploadToFirebase={props.uploadToFirebase}
                uploadProgress={props.uploadProgress} />

        </div>
    );
}

export default Header;