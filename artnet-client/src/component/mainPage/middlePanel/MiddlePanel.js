import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserService from '../../../services/UserService';
import PostService from '../../../services/PostService';
import Post from './Post';
import PostDetail from './PostDetail';
import './MiddlePanel.css';

import { updateUserPostArray } from '../../../store/storeUtil';
import { setIsPostDetail } from '../../../store/storeUtil';


const MiddlePanel = () => {
    const dispatch = useDispatch();
    const singlePostArray = useSelector((state) => state.post.singlePostArray);
    const userPostArray = useSelector((state) => state.post.userPostArray);
    const isPostDetail = useSelector((state) => state.parameter.isPostDetail);

    useEffect(() => {
        getLocalUserPostArray();
    }, []);

    const getLocalUserPostArray = () => {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        PostService.getAllByUserId(userId).then(response => {
            if (response.data.length > 0) {
                updateUserPostArray(dispatch, response.data);
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
            updateUserPostArray(dispatch, dummyPostArray);
        });
    }


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