import axios from 'axios';

const COMMENT_BASE_URL =  "http://localhost:8080/api/v1/comment";
                      

class CommentService{
    
    createComment(comment){
        return axios.post(COMMENT_BASE_URL + '/save', comment);
    }

    getAllByUserId(userId){
        return axios.get(COMMENT_BASE_URL + '/get-all-by-user-id/' + userId);
    }

    getAllByPostId(postId){
        return axios.get(COMMENT_BASE_URL + '/get-all-by-post-id/' + postId);
    }

    deleteComment(commentId){
        return axios.delete(COMMENT_BASE_URL + '/delete/' + commentId);
    }

    deleteAllCommentByUserId(userId){
        return axios.delete(COMMENT_BASE_URL + '/delete-all-by-id/' + userId);
    }
}

export default new CommentService()