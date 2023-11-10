import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserService from '../../../services/UserService';
import PostService from '../../../services/PostService';
import CommentService from '../../../services/CommentService';
import Post from './Post';
import PostDetail from './PostDetail';
import './MiddlePanel.css';


const MiddlePanel = () => {
    const dispatch = useDispatch();
    const singlePostArray = useSelector((state) => state.post.singlePostArray);
    const userPostArray = useSelector((state) => state.post.userPostArray);
    const isPostDetail = useSelector((state) => state.parameter.isPostDetail);
    const UPDATE_USER_POST_ARRAY = 'UPDATE_USER_POST_ARRAY';
    const UPDATE_SINGLE_POST_ARRAY = 'UPDATE_SINGLE_POST_ARRAY';
    const IS_POST_DETAIL = 'IS_POST_DETAIL';


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

    const setIsPostDetail = (postDetail) => {
        dispatch({
            type: IS_POST_DETAIL,
            isPostDetail: postDetail
        });
    };



    return (
        <div className='v-line-left v-line-right'>
            {isPostDetail === false ?
                <div>
                    {
                        userPostArray.map((item) => (
                            <Post postItem={item} />
                        ))
                    }
                </div>
                :
                <div>
                    {
                        singlePostArray.map((item) => (
                            <PostDetail postItem={item}
                                setIsPostDetail={setIsPostDetail} />
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default MiddlePanel; 