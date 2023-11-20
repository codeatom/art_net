import { useSelector } from 'react-redux';
import avatar from '../../../images/avatar.png';


const Chat = () => {
    const chatArray = useSelector((state) => state.chat.chatArray);

    const handleUserImg = (profileImg) => {
        if (profileImg == "" || profileImg == undefined) {
            return avatar;
        }
        return profileImg;
    }

    return (
        <div>
            {
                chatArray != null ?
                    chatArray.map((item) => (
                        <div className='all-comment'>
                            <div className='comment'>
                                <div>
                                    <img className='avatar' src={handleUserImg(item.userImage)} />
                                </div>
                                <div className='user-name'>
                                    {item.userName}
                                </div>
                                <div className='comment-date'>
                                    {item.commentDate}
                                </div>
                            </div>
                            <div>
                                {item.commentText}
                            </div>
                        </div>
                    ))
                    :
                    <div></div>
            }
        </div>
    );

}

export default Chat; 