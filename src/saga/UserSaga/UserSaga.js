import { takeLatest, call, put, select } from 'redux-saga/effects'
import { GET_ALL_PROJECT_SAGA } from '../../redux/types/ProjectType'
import { ASSIGN_USER_PROJECT_SAGA, GET_ALL_USER, GET_ALL_USER_SAGA, GET_USER_BY_PROJECTID, GET_USER_BY_PROJECTID_SAGA, GET_USER_SEARCH_SAGA, USER_LOGIN, USER_LOGIN_INFO, USER_LOGIN_SAGA, USER_SIGN_UP_SAGA, USER_TOKEN } from "../../redux/types/UserType"
import { userService } from '../../services/UserService'
import { STATUS_CODE } from "../../util/Constants/SettingDOMAIN";



// user sign in
function* userSignInSaga(action) {
    const { model } = action;

    try {
        const { data } = yield call(() => userService.userLogin(model))
        if (STATUS_CODE.SUCCESS) {
            localStorage.setItem(USER_LOGIN_INFO, JSON.stringify(data.content));
            localStorage.setItem(USER_TOKEN, data.content.accessToken)
            yield put({
                type: USER_LOGIN,
                userLogin: data.content
            })

            const history = yield select(state => state.HistoryReducer.history);
            history.push('/projectmanagement')

        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiUserSignInSaga() {
    return yield takeLatest(USER_LOGIN_SAGA, userSignInSaga)
}

// user sign up 
function* userSignUpSaga(action) {
    const { model } = action;
    try {
        yield call(() => userService.userSignUp(model));
        if (STATUS_CODE.SUCCESS) {
            const { history } = yield select(state => state.HistoryReducer);
            history.push('/login');
        }
    } catch (err) {
        console.log(err.response.data);
    }
}

export function* theoDoiUserSignUpSaga() {
    return yield takeLatest(USER_SIGN_UP_SAGA, userSignUpSaga)
}

// get all user
function* getAllUserSaga() {
    try {
        const { data } = yield call(() => userService.getAllUser());
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER,
                listUser: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetAllUserSaga() {
    yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga)
}


// assign User
function* assignUserSaga(action) {
    const { model } = action
    try {
        yield call(() => userService.assignUser(model));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_SAGA,
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiAssignUserSaga() {
    yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserSaga)
}


// search user
function* searchUserSaga(action) {
    const { keyWord } = action;
    try {
        const { data } = yield call(() => userService.searchUser(keyWord));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER,
                listUser: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiSeachUserSaga() {
    return yield takeLatest(GET_USER_SEARCH_SAGA, searchUserSaga)
}



// get user by project id
function* getUserInProjectSaga(action) {
    const { projectId } = action
    try {
        const { data } = yield call(() => userService.getUserByProjectId(projectId));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECTID,
                arrUserInProject: data.content
            })
        }

    } catch (err) {
        if (STATUS_CODE.NOT_FOUND) {
            console.log(err.response.data)
            yield put({
                type: GET_USER_BY_PROJECTID,
                arrUserInProject: []
            })
        }
    }
}

export function* theoDoiGetUserInProject() {
    return yield takeLatest(GET_USER_BY_PROJECTID_SAGA, getUserInProjectSaga)
}