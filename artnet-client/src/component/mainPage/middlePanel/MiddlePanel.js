import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserService from '../../../services/UserService';
import PostService from '../../../services/PostService';
import Post from './Post';
import './MiddlePanel.css';


const MiddlePanel = () => {
    const dispatch = useDispatch();
    const userPostArray = useSelector((state) => state.post.userPostArray);
    const UPDATE_USER_POST_ARRAY = 'UPDATE_USER_POST_ARRAY';


    useEffect(() => {
        getLocalUserPostArray();
    }, []);

    const getLocalUserPostArray = () => {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        PostService.getAllByUserId(userId).then(response => {
            if (response.data.length > 0) {
                undateUserPostArray(response.data);
            } else {
                getDummyPostArray();
            }
        });
    }

    const getDummyPostArray = () => {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        UserService.getUserByUserId(userId).then(response => {
            let dummyPostArray = [
                {
                    postId: 0,
                    description: "There is no post yet",
                    postImgURL: "",
                    postDate: "",
                    likeArray: [],
                    user: response.data,
                    comments: []
                }
            ]
            undateUserPostArray(dummyPostArray);
        });
    }

    const undateUserPostArray = (post) => {
        dispatch({
            type: UPDATE_USER_POST_ARRAY,
            userPostList: post
        });
    };


    return (
        <div className='v-line-left v-line-right'>
            <div>
                {
                    userPostArray.map((item) => (
                        <Post postItem={item} />
                    ))
                }
            </div>
        </div>
    );
}

export default MiddlePanel; 