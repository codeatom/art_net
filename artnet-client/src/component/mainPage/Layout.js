import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import Header from './header/Header';
import Footer from './footer/Footer'
import LeftPanel from './leftPanel/LeftPanel';
import RightPanel from './rightPanel/RightPanel';
import MiddlePanel from './middlePanel/MiddlePanel';
import UserService from '../../services/UserService';
import PostService from '../../services/PostService';
import './Layout.css';


const Layout = () => {
    const dispatch = useDispatch();
    const toggleModal = useSelector((state) => state.parameter.toggleModal);
    const [image, setImage] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [isProfileImg, setIsProfileImg] = useState(false);
    const [postDescription, setPostDescription] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const UPDATE_ALL_POST_ARRAY = 'UPDATE_ALL_POST_ARRAY';
    const UPDATE_USER_POST_ARRAY = 'UPDATE_USER_POST_ARRAY';
    const UPDATE_USER_IMG = 'UPDATE_USER_IMG';
    const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
    const TOGGLE_MODAL = 'TOGGLE_MODAL';


    const openDialog = (e) => {
        setImage(e.target.files[0]);
        setUploadImage(URL.createObjectURL(e.target.files[0]));
    }

    const uploadToFirebase = () => {
        if (uploadImage == null || uploadImage == "") {
            return;
        }
        upload();
    }

    const upload = (error) => {
        const storage = getStorage();
        let storageRef = ref(storage, `post-images/${uploadImage.name + v4()}`);

        if (isProfileImg) {
            storageRef = ref(storage, `profile-images/${uploadImage.name + v4()}`);
        }

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(Math.round(progress));
        },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    if (isProfileImg == false) {
                        uploadPostImg(url);
                    } else if (isProfileImg == true) {
                        uploadProfileImg(url);
                    }
                });
            }
        );
    }

    const uploadPostImg = (url) => {
        const user = JSON.parse(localStorage.getItem("user"));

        let postData = {
            "description": postDescription,
            "postImgURL": url,
            "userId": user.userId
        }
        PostService.createPost(postData).then(response => {
            updateAllPostArray(response.data);
            updateUserPostArray();
            closeDialogBox();
        })
    }

    const uploadProfileImg = (url) => {
        const user = JSON.parse(localStorage.getItem("user"));

        let userData = {
            "userId": user.userId,
            "userName": user.userName,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "userEmail": user.userEmail,
            "userImage": url
        }
        UserService.updateUser(userData).then((response) => {
            updateUserImg(response.data.userImage);
            updateUserName(response.data.userName);
            closeDialogBox();
        })
    }

    const handlePostDescription = (e) => {
        setPostDescription(e.target.value);
    }

    const closeDialogBox = () => {
        dispatch({
            type: TOGGLE_MODAL,
            toggleModal: !toggleModal
        });
    };

    const updateUserPostArray = () => {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        PostService.getAllByUserId(userId).then(response => {
            dispatch({
                type: UPDATE_USER_POST_ARRAY,
                userPostList: response.data,
            });
        });
    };

    const updateAllPostArray = (post) => {
        dispatch({
            type: UPDATE_ALL_POST_ARRAY,
            allPostList: post
        });
    };

    const updateUserImg = (image) => {
        dispatch({
            type: UPDATE_USER_IMG,
            userImage: image
        });
    };

    const updateUserName = (name) => {
        dispatch({
            type: UPDATE_USER_NAME,
            userName: name
        });
    };


    return (
        <div className="container mainpage-container">
            <div className="row">  {/* a bootstrap row */}
                <Header
                    uploadImage={uploadImage}
                    setUploadImage={setUploadImage}
                    setIsProfileImg={setIsProfileImg}
                    uploadToFirebase={uploadToFirebase}
                    uploadProgress={uploadProgress} />
            </div>

            <div className="row">{/* a bootstrap row */}
                <div className="col-3 left-panel">{/* a column */}
                    <LeftPanel />
                </div>

                <div className="col-6 middle-side">{/* a column */}
                    <MiddlePanel />
                </div>

                <div className="col-3 right-panel">{/* a column */}
                    <RightPanel
                        uploadImage={uploadImage}
                        setUploadImage={setUploadImage}
                        setIsProfileImg={setIsProfileImg}
                        uploadToFirebase={uploadToFirebase}
                        handlePostDescription={handlePostDescription}
                        uploadProgress={uploadProgress} />
                </div>
            </div>

            <div className="row">  {/* a bootstrap row */}
                <Footer />
            </div>


            <div> {/* not a row. for global file upload */}
                <input
                    type='file'
                    id='file-upload'
                    hidden={true}
                    onChange={openDialog}
                />
            </div>
        </div>
    );
}

export default Layout;