import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import addIcon from '../../../images/add-icon.png';


const UserFileUploadModal = (props) => {
    const toggleModal = useSelector((state) => state.parameter.toggleModal);
    const [uploading, setUploading] = useState(true);

    useEffect(() => {
        setUploading(true);
    }, [toggleModal])

    const uploadToFirebase = () => {
        props.uploadToFirebase();
        if (props.uploadImage != "" && props.uploadImage != undefined) {
            setUploading(false);
        }
    }


    return (
        <div>

            <Modal
                show={props.showUploadModal}
                onHide={props.closeUploadModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <div hidden={!props.isProfileImg}><Modal.Title>Choose Profile Pic</Modal.Title></div>
                    <div hidden={props.isProfileImg}><Modal.Title>Create Post</Modal.Title></div>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        rows={3} cols={55} type='text'
                        placeholder='description'
                        className='upload-text'
                        onChange={props.handlePostDescription}
                        hidden={props.isProfileImg} />
                    <img
                        src={props.uploadImage}
                        className='upload-img-preview' />
                </Modal.Body>
                <Modal.Footer>
                    <label for="file-upload" >
                        <img src={addIcon} className='upload-add-icon' />
                        <div className='add-icon-text'>Add image/file</div>
                    </label>
                    <button className="btn btn-primary" onClick={props.closeUploadModal}>Cancel</button>
                    <button className="btn btn-success" onClick={uploadToFirebase}>Upload</button>
                    <div hidden={uploading}>
                        {/* <div class="spinner-border" role="status"></div>Uploading... */}
                        <div class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></div>
                        Uploading... {props.uploadProgress} complete
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserFileUploadModal;