import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from 'uuid';
import Header from './header/Header';
import Footer from './footer/Footer'
import LeftPanel from './leftPanel/LeftPanel';
import RightPanel from './rightPanel/RightPanel';
import MiddlePanel from './middlePanel/MiddlePanel';
import UserService from '../../services/UserService';
import PostService from '../../services/PostService';
import './Layout.css';

import { updateAllPostArray } from '../../store/storeUtil';
import { updateUserPostArray } from '../../store/storeUtil';
import { updateUserImg } from '../../store/storeUtil';
import { updateUserName } from '../../store/storeUtil';
import { closeDialogBox } from '../../store/storeUtil';


const Layout = () => {
    const dispatch = useDispatch();
    const toggleModal = useSelector((state) => state.parameter.toggleModal);
    const [image, setImage] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [isProfileImg, setIsProfileImg] = useState(false);
    const [postDescription, setPostDescription] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);


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
            updateAllPostArray(dispatch, response.data);
            updateLocalUserPostArray();
            closeDialogBox(dispatch, toggleModal);
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

        deleteFromFirebaseStorage(user.userId);

        UserService.updateUser(userData).then((response) => {
            updateUserImg(dispatch, response.data.userImage);
            updateUserName(dispatch, response.data.userName);
            closeDialogBox(dispatch, toggleModal);
        })
    }

    const deleteFromFirebaseStorage = async (userId) => {
        await UserService.getUserByUserId(userId).then((response) => {
            if (response.data.userImage != "" && response.data.userImage != undefined) {
                const storage = getStorage();
                const userImgRef = ref(storage, response.data.userImage);
                deleteObject(userImgRef)
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    const handlePostDescription = (e) => {
        setPostDescription(e.target.value);
    }

    const updateLocalUserPostArray = () => {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        PostService.getAllByUserId(userId).then(response => {
            updateUserPostArray(dispatch, response.data)
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