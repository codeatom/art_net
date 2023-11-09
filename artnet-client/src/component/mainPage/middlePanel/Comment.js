import avatar from '../../../images/avatar.png';


const Comment = (props) => {
    const handleUserImg = (profileImg) => {
        if (profileImg == "" || profileImg == undefined) {
            return avatar;
        }
        return profileImg;
    }


    return (
        <div className='comment-section'>
            {
                props.item.comments != null ?
                    props.item.comments.map((item) => (
                        <div className='all-comment'>
                            <div className='comment'>
                                <div>
                                    <img className='avatar' src={handleUserImg(item.user.userImage)} />
                                </div>
                                <div className='user-name txt'>
                                    {item.user.userName}
                                </div>
                                <div className='comment-date'>
                                    {item.commentDate}
                                </div>                               
                            </div>
                            <div className='comment-text'>
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

export default Comment; 