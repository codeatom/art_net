import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import avatar from '../../../images/avatar.png';
import likebutton from '../../../images/likebutton.png';
import textIcon from '../../../images/text.png';
import more from '../../../images/more.png';
import PostService from '../../../services/PostService';
import EditOrDeletePostModal from '../modal/EditOrDeletePostModal';

import { updateUserPostArray } from '../../../store/storeUtil';
import { updateSinglePostArray } from '../../../store/storeUtil';
import { updateChatArray } from '../../../store/storeUtil';
import { disconnectFromChat } from '../../../store/storeUtil';
import { setIsPostDetail } from '../../../store/storeUtil';
import { hideTxtBox } from '../../../store/storeUtil';


const Post = (props) => {
    const dispatch = useDispatch();
    const menuRef = useRef();
    const [hideIcon, setHideIcon] = useState(false);
    const [isPostEdit, setIsPostEdit] = useState(false);
    const [showEditOrDeletePostModal, setShowEditOrDeletePostModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [bgColor, setGgColor] = useState("");

    useEffect(() => {
        if (props.postItem.postId < 1) {
            setHideIcon(true);
        }
    }, [])

    useEffect(() => {
        menuOpen ? setGgColor("more-menu-bg-color") : setGgColor("")
    }, [menuOpen])

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

    const handleUserImg = (userImage) => {
        if (userImage === "" || userImage === undefined) {
            return avatar;
        }
        return userImage;
    }

    const getPostByPostId = (postId) => {
        setTimeout(() => {
            disconnectFromChat(dispatch, true);
        }, 1000);

        PostService.getPostByPostId(postId).then(response => {
            let post = [response.data]
            updateSinglePostArray(dispatch, post);
        });
        setIsPostDetail(dispatch, true);
        hideTxtBox(dispatch, true);
        updateChatArray(dispatch, []);
    }

    const postComment = (postId) => {
        getPostByPostId(postId);
        props.connectUserToChat(postId);
        hideTxtBox(dispatch, false);
        updateChatArray(dispatch, []);
    }

    const setLikes = (postId) => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        PostService.setLikes(postId, localUser.userId).then((response) => {
            PostService.getAllByUserId(response.data.user.userId).then((response) => {
                updateUserPostArray(dispatch, response.data);
            })
        })
    }

    const openEditOrDeletePostModal = (isEdit) => {
        setIsPostEdit(isEdit);
        setMenuOpen(false);
        setShowEditOrDeletePostModal(true);
    }

    const handleMoreBtn = (userId) => {
        const localUser = JSON.parse(localStorage.getItem("user"));

        if (localUser.userId === userId && props.postItem.postId > 0) {
            return false;
        }
        else {
            return true;
        }
    }

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const closeEditOrDeletePostModal = () => {
        setShowEditOrDeletePostModal(false);
    }


    return (
        <div>
            <div className='row post-div bg-col-chngr'>
                <div className='col-10'>
                    <div className='post-header'>
                        <div>
                            <img className='avatar post-avatar-padding' src={handleUserImg(props.postItem.user.userImage)} alt="" />
                        </div>
                        <div className='user-name'>
                            <div>{props.postItem.user.userName}</div>
                        </div>
                        <div className='post-date'>
                            {props.postItem.postDate}
                        </div>
                    </div>

                    <div className='post-description'>
                        {props.postItem.description}
                    </div>

                    <div className='post-image-div'>
                        <img src={props.postItem.postImgURL} onClick={() => getPostByPostId(props.postItem.postId)} className='post-image' />
                    </div>

                    <div className='like-and-comment' hidden={hideIcon}>
                        <div onClick={() => postComment(props.postItem.postId, true)}>
                            <img src={textIcon} title="Reply" className='txt-icon' />
                        </div>
                        <div className='like-and-comment-count'>
                            {props.postItem.comments.length}
                        </div>
                        <div onClick={() => setLikes(props.postItem.postId)}>
                            <img src={likebutton} className='like-icon' title="Like it" />
                        </div>
                        <div className='like-and-comment-count'>
                            {props.postItem.likeArray.length}
                        </div>
                    </div>
                </div>

                <div className='col-2'>
                    <div ref={menuRef} className={'more-menu-div' + " " + bgColor}>
                        <div hidden={handleMoreBtn(props.postItem.user.userId)}>
                            <img className='more-btn' src={more} alt="" onClick={handleMenu} />
                        </div>
                        <div>
                            <div className='edit-delete-btn' hidden={!menuOpen} onClick={() => openEditOrDeletePostModal(true)}>
                                Edit
                            </div>
                            <div className='edit-delete-btn' hidden={!menuOpen} onClick={() => openEditOrDeletePostModal(false)}>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <EditOrDeletePostModal
                showEditOrDeletePostModal={showEditOrDeletePostModal}
                closeEditOrDeletePostModal={closeEditOrDeletePostModal}
                isPostEdit={isPostEdit}
                post={props.postItem} />

        </div>
    );
}

export default Post; 