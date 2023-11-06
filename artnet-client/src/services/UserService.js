import axios from 'axios';

const USER_BASE_URL = "http://localhost:8080/api/v1/user";
                      

class UserService{
    
    createUser(user){
        return axios.post(USER_BASE_URL + '/save', user);
    }

    getUserByUserId(userId){
        return axios.get(USER_BASE_URL + '/get-by-userId/'  + userId);
    }  

    getUserByEmail(userEmail){
        return axios.get(USER_BASE_URL + '/get-by-email?userEmail='  + userEmail);
    }
    
    getAllUsers(){
        return axios.get(USER_BASE_URL + '/get-all');
    } 

    updateUser(user){
        return axios.put(USER_BASE_URL + '/update', user);
    }
   
    searchForUsers(keyWord){
        return axios.get(USER_BASE_URL + '/search?keyWord=' + keyWord);
    }

    deleteUser(userId){
        return axios.delete(USER_BASE_URL + '/delete/' + userId);
    }
}

export default new UserService()