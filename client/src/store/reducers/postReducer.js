import actionTypes from "../actions/actionTypes";
const initState = {
    posts: [],
    currentPost: null
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_POST:
            return {
                ...state,
                posts: action.data
            }
        case actionTypes.DETAIL_POST:
            return {
                ...state,
                currentPost: action.data
            }
        default:
            return state;
    }
}

export default postReducer