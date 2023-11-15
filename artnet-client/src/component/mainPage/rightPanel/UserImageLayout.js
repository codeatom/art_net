import avatar from "../../../images/avatar.png";


const ImageLayout = (props) => {

    const handleUserImg = (profileImg) => {
        if (profileImg == "" || profileImg == undefined) {
            return avatar;
        }
        return profileImg;
    }

    return (
        <div className='user-img-layout bg-col-chngr' key={props.item.userId}>
            <div className='user-img'>
                <div>
                    <img className='avatar' src={handleUserImg(props.item.userImage)} />
                </div>
                <div className='user-name txt'>
                    {props.item.userName}
                </div>
            </div>
        </div>
    );
}

export default ImageLayout;