import axios from 'axios';

const POST_BASE_URL = "http://localhost:8080/api/v1/post";
                      

class PostService{
    
    createPost(post){
        return axios.post(POST_BASE_URL + '/save', post);
    }

    getAllPost(){
        return axios.get(POST_BASE_URL + '/get-all');
    }

    getAllByUserId(userId){
        return axios.get(POST_BASE_URL + '/get-all-by-user-id/' + userId);
    }

    getPostByPostId(postId){
        return axios.get(POST_BASE_URL + '/get-by-postId/' + postId);
    }

    setLikes(postId, localUserId){
        return axios.put(POST_BASE_URL + '/likes/' + postId + '/' + localUserId);
    }

    updatePost(postData){
        return axios.put(POST_BASE_URL + '/update', postData);
    }

    deletePost(postId){
        return axios.delete(POST_BASE_URL + '/delete/' + postId);
    }

    deleteAllPostByUserId(userId){
        return axios.delete(POST_BASE_URL + '/delete-all-by-id/' + userId);
    }
}

export default new PostService()