import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../../images/logo.png";
import avatar from "../../../images/avatar.png";
import UserService from '../../../services/UserService';
import "./Header.css";


const Header = () => {
    const dispatch = useDispatch();
    const userImage = useSelector((state) => state.user.userImage);
    const userName = useSelector((state) => state.user.userName);
    const UPDATE_USER_IMG = 'UPDATE_USER_IMG';
    const UPDATE_USER_NAME = 'UPDATE_USER_NAME';


    useEffect(() => {
        getLocalUser();
    }, [])

    const getLocalUser = () => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        UserService.getUserByUserId(localUser.userId).then(response => {
            undateUserImg(response.data.userImage);
            undateUserName(response.data.userName);
        });
    }

    const undateUserImg = (image) => {
        dispatch({
            type: UPDATE_USER_IMG,
            userImage: image
        });
    };

    const undateUserName = (name) => {
        dispatch({
            type: UPDATE_USER_NAME,
            userName: name
        });
    };

    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
    }


    return (
        <div className="row align-items-start h-line-left">
            <div className="col-2">
                <div>
                    <img src={logo} className='header-logo' />
                </div>
            </div>

            <div className="col-8">
                {/*Unused section*/}
            </div>

            <div className="col-2">
                <div className='header-user-data'>
                    <div>
                        <img src={handleUserImg(userImage)} alt='' class="avatar avatar-tweak" />
                    </div>
                    <div className='user-name header-profile-name'>
                        {userName}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;