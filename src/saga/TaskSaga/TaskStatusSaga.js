import { takeLatest, put, call } from 'redux-saga/effects'
import { GET_PROJECT_DETAIL_SAGA } from '../../redux/types/ProjectType';
import { GET_ALL_TASK_STATUS, GET_ALL_TASK_STATUS_SAGA } from '../../redux/types/StatusType'
import { UPDATE_TASK_STATUS_SAGA } from '../../redux/types/TaskType';
import { taskService } from '../../services/TaskService'
import { STATUS_CODE } from '../../util/Constants/SettingDOMAIN';


function* getAllTaskStatusSaga() {
    try {
        const { data } = yield call(() => taskService.getAllTaskStatus());
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_TASK_STATUS,
                arrTaskStatus: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetAllTaskStatusSaga() {
    return yield takeLatest(GET_ALL_TASK_STATUS_SAGA, getAllTaskStatusSaga)
}


function* updateTaskStatusSaga(action) {
    const { model, id } = action;
    try {
        yield call(() => taskService.updateStatusId(model));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                id
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiUpdateTaskStatusSaga() {
    return yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga)
}