import { takeLatest, call, put, select } from 'redux-saga/effects'
import { CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, GET_PROJECT_CATEGORY, GET_PROJECT_CATEGORY_SAGA, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA } from '../../redux/types/ProjectType'
import { REMOVE_USER_PROJECT_SAGA } from '../../redux/types/UserType'
import { projectService } from '../../services/ProjectService'
import { STATUS_CODE } from '../../util/Constants/SettingDOMAIN'
import { notifyFunction } from '../../util/Notification/notificationJira'

function* getAllProjectSaga(action) {
    try {
        const { data } = yield call(() => projectService.getAllProject())
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT,
                projectList: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetAllProjectSaga() {
    return yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}


// get project category
function* getProjectCategorySaga() {
    try {
        const { data } = yield call(() => projectService.getProjectCategory());
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_CATEGORY,
                projectCategory: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetProjectCategorySaga() {
    return yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategorySaga)
}


// get project detail
function* getProjectDetail(action) {
    const { id } = action;
    try {
        const { data } = yield call(() => projectService.getProjectDetail(id));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL,
                projectDetail: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetProjectDetail() {
    return yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetail)
}


// create project 
function* createProjectSaga(action) {
    const { model } = action;
    try {
        yield call(() => projectService.createProject(model));
        if (STATUS_CODE.SUCCESS) {
            const { history } = yield select(state => state.HistoryReducer)
            history.push('/projectmanagement')
        }
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiCreateProjectSaga() {
    return yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}

// delete project
function* deleteProjectSaga(action) {
    const { projectId } = action;
    try {
        yield call(() => projectService.deleteProject(projectId));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
            notifyFunction('success', 'Delete project successful !')
        }else{
            notifyFunction('error', 'Delete project fail !')
        }
    } catch (err) {
        notifyFunction('error', 'Delete project fail !')
        console.log(err.response.data)
    }
}

export function* theoDoiDeleteProject() {
    return yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
}




// remove user
function* removeUserProjectSaga(action) {
    const { model } = action;
    try {
            yield call(() => projectService.removeUser(model))
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_SAGA,

            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiRemoveUserProjectSaga() {
    return yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProjectSaga)
}