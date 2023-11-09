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
        const user = JSON.parse(localStorage.getItem("user"));

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(Math.round(progress));
        },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    if (isProfileImg == false) {
                        let postData = {
                            "description": postDescription,
                            "postImgURL": url,
                            "userId": user.userId
                        }
                        PostService.createPost(postData).then(response => {
                            closeDialogBox();
                        });
                    } else if (isProfileImg == true) {
                        let userData = {
                            "userId": user.userId,
                            "userName": user.userName,
                            "firstName": user.firstName,
                            "lastName": user.lastName,
                            "userEmail": user.userEmail,
                            "userImage": url
                        }
                        UserService.updateUser(userData).then(() => {
                            closeDialogBox();
                        });
                    }
                });
            }
        );
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