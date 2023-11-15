import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import UserService from '../../../services/UserService';
import PostService from '../../../services/PostService';
import Post from './Post';
import PostDetail from './PostDetail';
import './MiddlePanel.css';

import { updateUserPostArray } from '../../../store/storeUtil';
import { updateChatArray } from '../../../store/storeUtil';


var stompClient = null;
var socket = null;

const MiddlePanel = () => {
    const dispatch = useDispatch();
    const disconnectChat = useSelector((state) => state.parameter.disconnectChat);
    const singlePostArray = useSelector((state) => state.post.singlePostArray);
    const userPostArray = useSelector((state) => state.post.userPostArray);
    const isPostDetail = useSelector((state) => state.parameter.isPostDetail);
    const CHAT_URL = 'http://localhost:8080/chat';

    useEffect(() => {
        getLocalUserPostArray();
    }, []);

    useEffect(() => {
        if(disconnectChat === true && stompClient !== null){
            disconnectFromChat();
        }    
    }, [disconnectChat]);

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

    const connectUserToChat = (postId) => {
        socket = new SockJS(CHAT_URL);
        stompClient = over(socket);
        const chatList = [];

        stompClient.connect({}, () => {
            stompClient.subscribe('/comment' + '/' + postId, (comment) => {
                let commentData = JSON.parse(comment.body);
                chatList.push(commentData);
                updateChatArray(dispatch, chatList.slice());
            });
        });
    }

    const sendChatText = (chatMsg, postId) => {
        stompClient.send('/app/chat' + '/' + postId, {}, JSON.stringify(chatMsg));
    }

    const disconnectFromChat = () => {
        stompClient.disconnect();
    }


    return (
        <div className='v-line-left v-line-right'>
            {isPostDetail === false ?
                <div>
                    {
                        userPostArray.map((item) => (
                            <Post
                                postItem={item}
                                connectUserToChat={connectUserToChat} />
                        ))
                    }
                </div>
                :
                <div>
                    {
                        singlePostArray.map((item) => (
                            <PostDetail
                                postItem={item}
                                connectUserToChat={connectUserToChat}
                                sendChatText={sendChatText} />
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default MiddlePanel; 