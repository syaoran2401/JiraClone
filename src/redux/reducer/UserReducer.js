import { GET_ALL_USER, GET_USER_BY_PROJECTID, USER_LOGIN, USER_LOGIN_INFO } from "../types/UserType"


let us = {};
if(localStorage.getItem(USER_LOGIN_INFO)){
    us = JSON.parse(localStorage.getItem(USER_LOGIN_INFO))
}

const initialState = {
    userLogin : us,
    userSearch:[],
    arrUserInProject: [],
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {

    case USER_LOGIN:
        return { ...state,userLogin: action.userLogin };

    case GET_ALL_USER:{
        return {...state, userSearch: action.listUser}
    }

    case GET_USER_BY_PROJECTID:{
        return {...state, arrUserInProject: action.arrUserInProject}
    }
    default:
        return state
    }
}

export default UserReducer