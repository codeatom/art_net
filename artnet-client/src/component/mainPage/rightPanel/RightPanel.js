import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserService from '../../../services/UserService';
import textIcon from '../../../images/text.png';
import imageIcon from '../../../images/image.png';
import avatar from "../../../images/avatar.png";
import UserImageLayout from './UserImageLayout';
import './RightPanel.css'


const RightPanel = () => {
    const userImage = useSelector((state) => state.user.userImage);
    const userName = useSelector((state) => state.user.userName)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
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


    return (
        <div>
            <div className='right-panel-profile-div'>
                <div className='profile-data'>
                    <img className='avatar' src={handleUserImg(userImage)} alt='?' />
                    <div className='user-name'>{userName}</div>
                </div>
                <div className='upload-div'>
                    <div className='upload'>
                        <img src={textIcon} className='upload-icon' />
                        <div>Say Something</div>
                    </div>
                    <div className='upload'>
                        <img src={imageIcon} className='upload-icon' />
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
        </div >
    );
}

export default RightPanel;