const UPDATE_USER_IMG = 'UPDATE_USER_IMG';
const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
const UPDATE_ALL_POST_ARRAY = 'UPDATE_ALL_POST_ARRAY';
const UPDATE_USER_POST_ARRAY = 'UPDATE_USER_POST_ARRAY';
const UPDATE_SINGLE_POST_ARRAY = 'UPDATE_SINGLE_POST_ARRAY';
const IS_POST_DETAIL = 'IS_POST_DETAIL';
const TOGGLE_MODAL = 'TOGGLE_MODAL';


const updateUserImg = (reduxDispatchHook, image) => {
    reduxDispatchHook({
        type: UPDATE_USER_IMG,
        userImage: image
    });
};

const updateUserName = (reduxDispatchHook, name) => {
    reduxDispatchHook({
        type: UPDATE_USER_NAME,
        userName: name
    });
};

const updateAllPostArray = (reduxDispatchHook, post) => {
    reduxDispatchHook({
        type: UPDATE_ALL_POST_ARRAY,
        allPostList: post
    });
};

const updateUserPostArray = (reduxDispatchHook, post) => {
    reduxDispatchHook({
        type: UPDATE_USER_POST_ARRAY,
        userPostList: post
    });
};

const updateSinglePostArray = (reduxDispatchHook, post) => {
    reduxDispatchHook({
        type: UPDATE_SINGLE_POST_ARRAY,
        singlePostList: post
    });
};

const setIsPostDetail = (reduxDispatchHook, postDetail) => {
    reduxDispatchHook({
        type: IS_POST_DETAIL,
        isPostDetail: postDetail
    });
};

const closeDialogBox = (reduxDispatchHook, toggleModal) => {
    reduxDispatchHook({
        type: TOGGLE_MODAL,
        toggleModal: !toggleModal
    });
};


export { updateUserImg }
export { updateUserName }
export { updateAllPostArray }
export { updateUserPostArray }
export { updateSinglePostArray }
export { setIsPostDetail }
export { closeDialogBox }
