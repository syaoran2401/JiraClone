import { put, call, takeLatest, select } from 'redux-saga/effects'
import { GET_PROJECT_DETAIL_SAGA } from '../../redux/types/ProjectType';
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODEL, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_ASSIGNESS } from '../../redux/types/TaskType'
import { taskService } from '../../services/TaskService';
import { STATUS_CODE } from '../../util/Constants/SettingDOMAIN';

function* getTaskListDetailSaga(action) {
    const { taskId } = action;
    try {
        const { data } = yield call(() => taskService.getTaskListDetail(taskId));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskListDetail: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetTaskListDetailSaga() {
    return yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskListDetailSaga)
}


function* handleChangePostAPI(action) {
    switch (action.actionType) {
        case CHANGE_TASK_MODEL: {
            const { name, value } = action;
            yield put({
                type: CHANGE_TASK_MODEL,
                name, value
            })
            break
        }

        case CHANGE_ASSIGNESS: {
            const { assigness } = action;
            yield put({
                type: CHANGE_ASSIGNESS,
                assigness
            })
            break
        }

        case REMOVE_ASSIGNESS: {
            const { userId } = action;
            yield put({
                type: REMOVE_ASSIGNESS,
                userId
            })
            break
        }

        default: {
            break
        }
    }
    let { taskListDetail } = yield select(state => state.TaskReducer);
    const listUserAsign = taskListDetail.assigness.map((mem, index) => {
        return mem.id
    })



    const taskListUpdateAPI = { ...taskListDetail, listUserAsign };

    try {
        yield call(() => taskService.updateTaskList(taskListUpdateAPI));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                id: taskListUpdateAPI.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskListUpdateAPI.taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiHandleChangePostAPI() {
    return yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostAPI)
}